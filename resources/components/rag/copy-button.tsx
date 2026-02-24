import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps): React.ReactNode {
    const [copied, setCopied] = useState(false);

    function handleCopy(): void {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    return (
        <button
            onClick={handleCopy}
            className="border-border bg-background hover:border-ring hover:bg-muted flex cursor-pointer items-center gap-1.5 border-2 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide transition-all md:gap-2 md:px-3 md:py-1.5 md:text-xs"
        >
            {copied ? (
                <>
                    <Check size={11} strokeWidth={2.5} className="text-foreground md:hidden" />
                    <Check size={12} strokeWidth={2.5} className="text-foreground hidden md:block" />
                    <span className="text-foreground">COPIED</span>
                </>
            ) : (
                <>
                    <Copy size={11} strokeWidth={2.5} className="text-muted-foreground md:hidden" />
                    <Copy size={12} strokeWidth={2.5} className="text-muted-foreground hidden md:block" />
                    <span className="text-muted-foreground">COPY</span>
                </>
            )}
        </button>
    );
}
