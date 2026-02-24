import { cosineSimilarity } from '@/lib/rag/similarity';
import { TFIDFVectorizer } from '@/lib/rag/tfidf-vectorizer';
import type { AugmentedPrompt, RagSettings, RetrievalResult, StageKey } from '@/lib/rag/types';
import { Chunk, chunkText } from '@/lib/rag/utils';
import { useCallback, useState } from 'react';

const SYSTEM_PROMPT = `
You are a helpful assistant part of a browser-based demo system meant to showcase the usefulness of Retrieval-Augmented Generation (RAG).
Use ONLY the context below to answer. If insufficient, say so.
`;

interface RagPipelineState {
    chunks: Chunk[];
    embeddings: Float32Array[];
    vectorizer: TFIDFVectorizer | null;
    isIndexed: boolean;
    isProcessing: boolean;
    activeStage: StageKey | null;
    completedStages: StageKey[];
    retrieval: RetrievalResult[] | null;
    augmentedPrompt: AugmentedPrompt | null;
    response: string;
    error: string;
}

interface RagPipelineActions {
    indexDocuments: (text: string, settings: RagSettings) => void;
    runQuery: (query: string, apiKey: string, topK: number) => Promise<void>;
    reset: () => void;
}

export function useRagPipeline(): RagPipelineState & RagPipelineActions {
    const [chunks, setChunks] = useState<Chunk[]>([]);
    const [embeddings, setEmbeddings] = useState<Float32Array[]>([]);
    const [vectorizer, setVectorizer] = useState<TFIDFVectorizer | null>(null);
    const [isIndexed, setIsIndexed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeStage, setActiveStage] = useState<StageKey | null>(null);
    const [completedStages, setCompletedStages] = useState<StageKey[]>([]);
    const [retrieval, setRetrieval] = useState<RetrievalResult[] | null>(null);
    const [augmentedPrompt, setAugmentedPrompt] = useState<AugmentedPrompt | null>(null);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const reset = useCallback(() => {
        setActiveStage(null);
        setCompletedStages([]);
        setRetrieval(null);
        setAugmentedPrompt(null);
        setResponse('');
        setError('');
    }, []);

    const progressStage = useCallback(async (stage: StageKey, delayMs: number, completed: StageKey[]) => {
        setActiveStage(stage);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        setCompletedStages(completed);
    }, []);

    const indexDocuments = useCallback(
        (text: string, settings: RagSettings) => {
            if (!text.trim()) return;

            const newChunks = chunkText(text, {
                chunkSize: settings.chunkSize,
                overlap: settings.chunkOverlap,
                strategy: settings.chunkStrategy,
            });

            const newVectorizer = new TFIDFVectorizer();
            newVectorizer.fit(newChunks.map((chunk) => chunk.text));

            setChunks(newChunks);
            setEmbeddings(newChunks.map((chunk) => newVectorizer.transform(chunk.text)));
            setVectorizer(newVectorizer);
            setIsIndexed(true);
            reset();
        },
        [reset],
    );

    const runQuery = useCallback(
        async (query: string, apiKey: string, topK: number) => {
            if (!query.trim() || !vectorizer || !apiKey.trim()) return;

            setIsProcessing(true);
            reset();

            await progressStage('chunk', 300, ['chunk']);
            await progressStage('embed', 350, ['chunk', 'embed']);
            const queryVector = vectorizer.transform(query);

            await progressStage('retrieve', 300, ['chunk', 'embed', 'retrieve']);
            const scores = embeddings
                .map((embedding, index) => ({
                    chunk: chunks[index],
                    score: cosineSimilarity(queryVector, embedding),
                }))
                .sort((a, b) => b.score - a.score);
            const topResults = scores.slice(0, topK);
            setRetrieval(topResults);

            await progressStage('augment', 200, ['chunk', 'embed', 'retrieve', 'augment']);
            const context = topResults
                .map((result) => `[Chunk ${result.chunk.id + 1} | Score: ${result.score.toFixed(4)}]\n${result.chunk.text}`)
                .join('\n\n---\n\n');

            const augementedSystemPrompt = `${SYSTEM_PROMPT}\n\nContext:\n${context}`.trim();

            setAugmentedPrompt({ system: augementedSystemPrompt, user: query });
            setActiveStage('generate');

            try {
                const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01',
                        'anthropic-dangerous-direct-browser-access': 'true',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1024,
                        system: augementedSystemPrompt,
                        messages: [{ role: 'user', content: query }],
                        stream: true,
                    }),
                });

                if (!apiResponse.ok) {
                    throw new Error(`API ${apiResponse.status}: ${(await apiResponse.text()).slice(0, 200)}`);
                }
                if (!apiResponse.body) {
                    throw new Error('Response body is null');
                }

                const reader = apiResponse.body.getReader();
                const decoder = new TextDecoder();
                let fullResponse = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    for (const line of decoder.decode(value).split('\n')) {
                        if (line.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(line.slice(6));
                                if (data.type === 'content_block_delta' && data.delta?.text) {
                                    fullResponse += data.delta.text;
                                    setResponse(fullResponse);
                                }
                            } catch {
                                // Ignore malformed JSON lines in stream
                            }
                        }
                    }
                }
                setCompletedStages(['chunk', 'embed', 'retrieve', 'augment', 'generate']);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }

            setActiveStage(null);
            setIsProcessing(false);
        },
        [vectorizer, embeddings, chunks, reset, progressStage],
    );

    return {
        chunks,
        embeddings,
        vectorizer,
        isIndexed,
        isProcessing,
        activeStage,
        completedStages,
        retrieval,
        augmentedPrompt,
        response,
        error,
        indexDocuments,
        runQuery,
        reset,
    };
}
