import type { ResultTab } from '@/lib/rag/types';

interface ResultTabsProps {
    activeTab: ResultTab;
    onTabChange: (tab: ResultTab) => void;
}

const TABS: { id: ResultTab; label: string }[] = [
    { id: 'response', label: 'RESPONSE' },
    { id: 'chunks', label: 'RETRIEVED' },
    { id: 'prompt', label: 'PROMPT' },
];

export function ResultTabs({ activeTab, onTabChange }: ResultTabsProps): React.ReactNode {
    return (
        <div className="border-border grid grid-cols-3 gap-0.5 border-b-2 bg-border">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`cursor-pointer border-none py-2.5 font-mono text-xs font-bold tracking-wider transition-all md:py-3.5 md:text-sm ${
                        activeTab === tab.id ? 'bg-secondary text-foreground' : 'bg-background text-muted-foreground hover:bg-muted'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
