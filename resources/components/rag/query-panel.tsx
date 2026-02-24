import { STAGE_CONFIG } from '@/lib/rag/stage-config';
import type { AugmentedPrompt, ResultTab, RetrievalResult, StageKey } from '@/lib/rag/types';
import { Loader2, Play, Search } from 'lucide-react';
import type { RefObject } from 'react';

import { ChunksTabContent } from './chunks-tab-content';
import { EmptyState } from './empty-state';
import { PipelineBar } from './pipeline-bar';
import { PromptTabContent } from './prompt-tab-content';
import { ResponseTabContent } from './response-tab-content';
import { ResultTabs } from './result-tabs';

interface QueryPanelProps {
    query: string;
    apiKey: string;
    isIndexed: boolean;
    isProcessing: boolean;
    canRunQuery: boolean;
    hasPipeline: boolean;
    activeStage: StageKey | null;
    completedStages: StageKey[];
    tab: ResultTab;
    response: string;
    error: string;
    retrieval: RetrievalResult[] | null;
    augmentedPrompt: AugmentedPrompt | null;
    maxScore: number;
    responseRef: RefObject<HTMLDivElement | null>;
    onQueryChange: (value: string) => void;
    onQueryKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onRunQuery: () => void;
    onTabChange: (tab: ResultTab) => void;
}

export function QueryPanel({
    query,
    apiKey,
    isIndexed,
    isProcessing,
    canRunQuery,
    hasPipeline,
    activeStage,
    completedStages,
    tab,
    response,
    error,
    retrieval,
    augmentedPrompt,
    maxScore,
    responseRef,
    onQueryChange,
    onQueryKeyDown,
    onRunQuery,
    onTabChange,
}: QueryPanelProps): React.ReactNode {
    return (
        <div className="bg-background flex h-full flex-col overflow-hidden">
            <div className="border-border flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 md:gap-2.5 md:px-6 md:py-4">
                <Search size={12} strokeWidth={2.5} className="text-muted-foreground md:hidden" />
                <Search size={14} strokeWidth={2.5} className="text-muted-foreground hidden md:block" />
                <span className="text-muted-foreground font-mono text-xs font-bold tracking-wider md:text-sm">QUERY</span>
            </div>

            <div className="border-border grid shrink-0 grid-cols-[1fr_auto] gap-px border-b-2 bg-[#191919]">
                <input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    onKeyDown={onQueryKeyDown}
                    placeholder={isIndexed ? 'Ask a question...' : 'Index a document first'}
                    disabled={!isIndexed}
                    className="bg-background text-foreground placeholder:text-muted-foreground/30 focus:border-muted-foreground focus:ring-0 border-2 border-transparent px-4 py-3 font-mono text-xs outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-4 md:text-sm"
                />
                <button
                    onClick={onRunQuery}
                    disabled={!canRunQuery}
                    className={`flex items-center gap-2 px-4 font-mono text-xs font-bold tracking-wider transition-all md:gap-2.5 md:px-6 md:text-sm ${
                        canRunQuery ? 'cursor-pointer bg-white text-black hover:bg-[#f0f0f0]' : 'bg-background cursor-not-allowed text-[#333]'
                    }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 size={14} strokeWidth={2.5} className="animate-spin md:hidden" />
                            <Loader2 size={16} strokeWidth={2.5} className="hidden animate-spin md:block" />
                        </>
                    ) : (
                        <>
                            <Play size={14} strokeWidth={2.5} className="md:hidden" />
                            <Play size={16} strokeWidth={2.5} className="hidden md:block" />
                        </>
                    )}{' '}
                    RUN
                </button>
            </div>

            {!apiKey && isIndexed && (
                <div className="border-border bg-muted text-muted-foreground shrink-0 border-b-2 px-4 py-2 font-mono text-xs md:px-6 md:py-3 md:text-xs">
                    API key required · Stays in browser
                </div>
            )}

            {hasPipeline ? (
                <div className="fadein flex min-h-0 flex-1 flex-col overflow-hidden">
                    <PipelineBar stages={STAGE_CONFIG} activeStage={activeStage} completedStages={completedStages} />

                    <ResultTabs activeTab={tab} onTabChange={onTabChange} />

                    <div ref={responseRef} className="flex-1 overflow-y-auto p-4 md:p-6">
                        {tab === 'response' && <ResponseTabContent response={response} error={error} />}
                        {tab === 'chunks' && <ChunksTabContent retrieval={retrieval} maxScore={maxScore} />}
                        {tab === 'prompt' && <PromptTabContent augmentedPrompt={augmentedPrompt} />}
                    </div>
                </div>
            ) : (
                <EmptyState isIndexed={isIndexed} />
            )}
        </div>
    );
}
