import { Loader2, MessageSquare } from 'lucide-react';

import { CopyButton } from './copy-button';

interface ResponseTabContentProps {
    response: string;
    error: string;
}

export function ResponseTabContent({ response, error }: ResponseTabContentProps): React.ReactNode {
    if (response) {
        return (
            <div className="fadein">
                <div className="border-border mb-3 flex items-center justify-between border-b-2 pb-2 md:mb-4 md:pb-3">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider md:gap-2 md:text-sm">
                        <MessageSquare size={12} strokeWidth={2.5} className="md:hidden" />
                        <MessageSquare size={14} strokeWidth={2.5} className="hidden md:block" />
                        OUTPUT
                    </span>
                    <CopyButton text={response} />
                </div>
                <p className="text-foreground/90 font-sans text-sm leading-relaxed md:text-base">{response}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fadein border-destructive/20 bg-destructive/10 border-2 p-4 md:p-6">
                <p className="text-destructive-foreground font-mono text-xs md:text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs md:gap-3 md:text-sm">
            <Loader2 size={14} strokeWidth={2.5} className="animate-spin md:hidden" />
            <Loader2 size={16} strokeWidth={2.5} className="hidden animate-spin md:block" /> Processing...
        </div>
    );
}
