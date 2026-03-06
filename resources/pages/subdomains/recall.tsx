import { DocumentPanel } from '@/components/rag/document-panel';
import { Header } from '@/components/rag/header';
import { QueryPanel } from '@/components/rag/query-panel';
import { useRagPipeline } from '@/hooks/use-rag-pipeline';
import type { RagSettings, ResultTab } from '@/lib/rag/types';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

const PAGE_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: hsl(var(--background)); }
    ::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground) / 0.5); }
    ::selection { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
    textarea, input, select { font-family: inherit; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg) } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .fadein { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-spin { animation: spin 0.8s linear infinite; }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .grid-bg {
        background-image: linear-gradient(hsl(var(--muted)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted)) 1px, transparent 1px);
        background-size: 48px 48px;
    }
`;

const DEFAULT_SETTINGS: RagSettings = {
    chunkSize: 400,
    chunkOverlap: 80,
    chunkStrategy: 'fixed',
    topK: 3,
};

const STORAGE_KEY_API_KEY = 'rag-anthropic-api-key';

export default function Recall(): ReactNode {
    const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY_API_KEY) || '');
    const [showKey, setShowKey] = useState(false);
    const [docText, setDocText] = useState('');
    const [settings, setSettings] = useState<RagSettings>(DEFAULT_SETTINGS);
    const [query, setQuery] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [tab, setTab] = useState<ResultTab>('response');
    const responseRef = useRef<HTMLDivElement>(null);

    const pipeline = useRagPipeline();

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_API_KEY, apiKey);
    }, [apiKey]);

    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
    }, [pipeline.response]);

    function handleDocTextChange(value: string): void {
        setDocText(value);
        if (pipeline.isIndexed) {
            pipeline.reset();
        }
    }

    function handleIndexDocuments(): void {
        pipeline.indexDocuments(docText, settings);
    }

    function handleRunQuery(): void {
        setTab('response');
        pipeline.runQuery(query, apiKey, settings.topK);
    }

    function handleQueryKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleRunQuery();
        }
    }

    function updateSetting<K extends keyof RagSettings>(key: K, value: RagSettings[K]): void {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }

    function handleClearApiKey(): void {
        setApiKey('');
    }

    const maxScore = pipeline.retrieval ? Math.max(...pipeline.retrieval.map((r) => r.score), 0.001) : 1;
    const hasPipeline = pipeline.activeStage !== null || pipeline.completedStages.length > 0;
    const canRunQuery = pipeline.isIndexed && query.trim() !== '' && apiKey.trim() !== '' && !pipeline.isProcessing;

    return (
        <>
            <Head title="Recall | Client-Side RAG Demo" />

            <div className="bg-background text-foreground flex h-screen flex-col font-mono">
                <style>{PAGE_STYLES}</style>

                <Header
                    apiKey={apiKey}
                    showKey={showKey}
                    showSettings={showSettings}
                    settings={settings}
                    onApiKeyChange={setApiKey}
                    onClearApiKey={handleClearApiKey}
                    onToggleShowKey={() => setShowKey(!showKey)}
                    onToggleSettings={() => setShowSettings(!showSettings)}
                    onUpdateSetting={updateSetting}
                />

                <main className="flex-1 overflow-hidden">
                    <div className="bg-border grid h-full grid-cols-1 gap-px overflow-hidden lg:grid-cols-2">
                        <DocumentPanel
                            docText={docText}
                            chunks={pipeline.chunks}
                            isIndexed={pipeline.isIndexed}
                            onDocTextChange={handleDocTextChange}
                            onIndex={handleIndexDocuments}
                        />

                        <QueryPanel
                            query={query}
                            apiKey={apiKey}
                            isIndexed={pipeline.isIndexed}
                            isProcessing={pipeline.isProcessing}
                            canRunQuery={canRunQuery}
                            hasPipeline={hasPipeline}
                            activeStage={pipeline.activeStage}
                            completedStages={pipeline.completedStages}
                            tab={tab}
                            response={pipeline.response}
                            error={pipeline.error}
                            retrieval={pipeline.retrieval}
                            augmentedPrompt={pipeline.augmentedPrompt}
                            maxScore={maxScore}
                            responseRef={responseRef}
                            onQueryChange={setQuery}
                            onQueryKeyDown={handleQueryKeyDown}
                            onRunQuery={handleRunQuery}
                            onTabChange={setTab}
                        />
                    </div>
                </main>

                <footer className="border-border border-t px-4 py-3 md:px-8 md:py-6">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-0">
                        <span className="text-muted-foreground/40 text-xs font-medium tracking-wide md:text-xs">
                            CLIENT-SIDE · NO DATA LEAVES BROWSER
                        </span>
                        <a href="https://bryson.cc" target="_blank" className="text-muted-foreground/40 hover:text-muted-foreground text-xs font-medium tracking-wide md:text-right">
                            BRYSON.CC
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}

Recall.layout = (children: ReactNode | undefined) => <>{children}</>;
