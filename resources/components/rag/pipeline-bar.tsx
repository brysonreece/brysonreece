import type { StageConfig, StageKey } from '@/lib/rag/types';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface PipelineBarProps {
    stages: StageConfig[];
    activeStage: StageKey | null;
    completedStages: StageKey[];
}

export function PipelineBar({ stages, activeStage, completedStages }: PipelineBarProps): React.ReactNode {
    return (
        <div className="border-border bg-border grid shrink-0 grid-cols-5 border-b-2">
            {stages.map((stage) => {
                const Icon = stage.icon;
                const isActive = activeStage === stage.key;
                const isComplete = completedStages.includes(stage.key);

                let stageClasses = 'bg-background text-muted-foreground/40';

                if (isActive) {
                    stageClasses = 'bg-primary text-primary-foreground';
                } else if (isComplete) {
                    stageClasses = 'bg-green-950/50 text-muted-foreground';
                }

                return (
                    <div
                        key={stage.key}
                        className={`flex flex-col items-center justify-center gap-1 py-2 font-mono text-xs font-bold tracking-wide transition-all duration-300 md:flex-row md:gap-2.5 md:py-4 md:text-sm md:tracking-wider ${stageClasses}`}
                    >
                        {isActive ? (
                            <>
                                <Loader2 size={12} strokeWidth={2.5} className="animate-spin md:hidden" />
                                <Loader2 size={16} strokeWidth={2.5} className="hidden animate-spin md:block" />
                            </>
                        ) : isComplete ? (
                            <>
                                <CheckCircle2 size={12} strokeWidth={2.5} className="md:hidden" />
                                <CheckCircle2 size={16} strokeWidth={2.5} className="hidden md:block" />
                            </>
                        ) : (
                            <>
                                <Icon size={12} strokeWidth={2.5} className="md:hidden" />
                                <Icon size={16} strokeWidth={2.5} className="hidden md:block" />
                            </>
                        )}
                        <span className="hidden md:inline">{stage.label}</span>
                        <span className="md:hidden">{stage.label.split(' ')[0]}</span>
                    </div>
                );
            })}
        </div>
    );
}
