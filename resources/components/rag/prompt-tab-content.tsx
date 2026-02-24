import type { AugmentedPrompt } from '@/lib/rag/types';

import { CopyButton } from './copy-button';

interface PromptTabContentProps {
    augmentedPrompt: AugmentedPrompt | null;
}

export function PromptTabContent({ augmentedPrompt }: PromptTabContentProps): React.ReactNode {
    if (!augmentedPrompt) {
        return <p className="text-muted-foreground font-mono text-xs md:text-sm">Waiting for augmentation...</p>;
    }

    return (
        <div className="fadein space-y-4 md:space-y-6">
            <div>
                <div className="border-border mb-2 flex items-center justify-between border-b-2 pb-1.5 md:mb-3 md:pb-2">
                    <span className="text-muted-foreground font-mono text-xs font-bold tracking-wider md:text-sm">SYSTEM</span>
                    <CopyButton text={augmentedPrompt.system} />
                </div>
                <pre
                    className="border-border bg-card text-muted-foreground overflow-y-auto border-2 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap md:p-5 md:text-sm"
                    style={{ maxHeight: '300px' }}
                >
                    {augmentedPrompt.system}
                </pre>
            </div>
            <div>
                <div className="border-border mb-2 border-b-2 pb-1.5 md:mb-3 md:pb-2">
                    <span className="text-muted-foreground font-mono text-xs font-bold tracking-wider md:text-sm">USER</span>
                </div>
                <pre className="border-border bg-card text-foreground/80 border-2 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap md:p-5 md:text-sm">
                    {augmentedPrompt.user}
                </pre>
            </div>
        </div>
    );
}
