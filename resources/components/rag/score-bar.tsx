interface ScoreBarProps {
    score: number;
    maxScore?: number;
}

export function ScoreBar({ score, maxScore = 1 }: ScoreBarProps): React.ReactNode {
    const percentage = Math.max(0, Math.min(100, (score / maxScore) * 100));

    return (
        <div className="flex items-center gap-3 md:gap-4">
            <div className="border-border bg-muted h-1 flex-1 overflow-hidden border md:h-1.5">
                <div
                    className="from-primary to-primary/70 h-full bg-linear-to-r transition-[width] duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-muted-foreground min-w-16 text-right font-mono text-xs font-semibold md:min-w-20 md:text-sm">
                {score.toFixed(4)}
            </span>
        </div>
    );
}
