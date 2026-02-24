import { FileText, Search } from 'lucide-react';

interface EmptyStateProps {
    isIndexed: boolean;
}

export function EmptyState({ isIndexed }: EmptyStateProps): React.ReactNode {
    return (
        <div className="grid-bg grid flex-1 place-items-center py-16 md:py-32">
            <div className="text-center">
                {isIndexed ? (
                    <>
                        <Search size={24} strokeWidth={2} className="text-muted-foreground/20 mx-auto md:hidden" />
                        <Search size={32} strokeWidth={2} className="text-muted-foreground/20 mx-auto hidden md:block" />
                    </>
                ) : (
                    <>
                        <FileText size={24} strokeWidth={2} className="text-muted-foreground/20 mx-auto md:hidden" />
                        <FileText size={32} strokeWidth={2} className="text-muted-foreground/20 mx-auto hidden md:block" />
                    </>
                )}
                <p className="text-muted-foreground/40 mt-4 font-mono text-xs font-medium tracking-wide md:mt-6 md:text-sm">
                    {isIndexed ? 'ENTER A QUERY TO EXECUTE PIPELINE' : 'INDEX A DOCUMENT TO BEGIN'}
                </p>
            </div>
        </div>
    );
}
