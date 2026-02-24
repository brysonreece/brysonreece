import type { RetrievalResult } from '@/lib/rag/types';

import { ScoreBar } from './score-bar';

interface ChunksTabContentProps {
    retrieval: RetrievalResult[] | null;
    maxScore: number;
}

export function ChunksTabContent({ retrieval, maxScore }: ChunksTabContentProps): React.ReactNode {
    if (!retrieval) {
        return <p className="text-muted-foreground font-mono text-xs md:text-sm">Waiting for retrieval...</p>;
    }

    return (
        <div className="fadein space-y-3 md:space-y-4">
            {retrieval.map((result, index) => (
                <div key={index} className="border-border bg-card hover:border-muted-foreground/50 border-2 p-4 transition-colors md:p-5">
                    <div className="mb-2 flex items-baseline justify-between md:mb-3">
                        <span className="text-foreground font-mono text-sm font-bold md:text-sm">
                            CHUNK #{String(result.chunk.id + 1).padStart(2, '0')}{' '}
                            <span className="text-muted-foreground ml-1.5 text-xs font-medium md:ml-2 md:text-sm">rank {index + 1}</span>
                        </span>
                    </div>
                    <ScoreBar score={result.score} maxScore={maxScore} />
                    <p className="text-muted-foreground mt-3 font-mono text-xs leading-relaxed md:mt-4 md:text-sm">{result.chunk.text}</p>
                </div>
            ))}
        </div>
    );
}
