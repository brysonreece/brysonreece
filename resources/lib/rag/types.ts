import type { Chunk } from '@/lib/rag/utils';

export interface RetrievalResult {
    chunk: Chunk;
    score: number;
}

export interface AugmentedPrompt {
    system: string;
    user: string;
}

export type StageKey = 'chunk' | 'embed' | 'retrieve' | 'augment' | 'generate';

export interface StageConfig {
    key: StageKey;
    label: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

export interface RagSettings {
    chunkSize: number;
    chunkOverlap: number;
    chunkStrategy: 'fixed' | 'sentence';
    topK: number;
}

export interface IndexedDocument {
    chunks: Chunk[];
    embeddings: Float32Array[];
}

export type ResultTab = 'response' | 'chunks' | 'prompt';
