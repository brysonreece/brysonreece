import type { RagSettings } from '@/lib/rag/types';

interface SettingsPanelProps {
    settings: RagSettings;
    onUpdateSetting: <K extends keyof RagSettings>(key: K, value: RagSettings[K]) => void;
}

export function SettingsPanel({ settings, onUpdateSetting }: SettingsPanelProps): React.ReactNode {
    return (
        <div className="fadein border-border bg-card border-t-2 px-4 py-4 md:px-8 md:py-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
                <div>
                    <label className="text-muted-foreground mb-1.5 block font-mono text-xs font-semibold tracking-wider md:mb-2 md:text-xs">
                        CHUNK SIZE
                    </label>
                    <input
                        type="number"
                        value={settings.chunkSize}
                        onChange={(e) => onUpdateSetting('chunkSize', +e.target.value)}
                        min={100}
                        max={2000}
                        step={50}
                        className="border-border bg-background text-foreground focus:border-muted-foreground focus:ring-0 w-full border-2 px-2.5 py-1.5 font-mono text-xs font-medium transition-colors outline-none md:px-3 md:py-2 md:text-sm"
                    />
                </div>
                <div>
                    <label className="text-muted-foreground mb-1.5 block font-mono text-xs font-semibold tracking-wider md:mb-2 md:text-xs">
                        OVERLAP
                    </label>
                    <input
                        type="number"
                        value={settings.chunkOverlap}
                        onChange={(e) => onUpdateSetting('chunkOverlap', +e.target.value)}
                        min={0}
                        max={500}
                        step={10}
                        className="border-border bg-background text-foreground focus:border-muted-foreground focus:ring-0 w-full border-2 px-2.5 py-1.5 font-mono text-xs font-medium transition-colors outline-none md:px-3 md:py-2 md:text-sm"
                    />
                </div>
                <div>
                    <label className="text-muted-foreground mb-1.5 block font-mono text-xs font-semibold tracking-wider md:mb-2 md:text-xs">
                        STRATEGY
                    </label>
                    <select
                        value={settings.chunkStrategy}
                        onChange={(e) => onUpdateSetting('chunkStrategy', e.target.value as 'fixed' | 'sentence')}
                        className="border-border bg-background text-foreground focus:border-muted-foreground focus:ring-0 w-full border-2 px-2.5 py-1.5 font-mono text-xs font-medium transition-colors outline-none md:px-3 md:py-2 md:text-sm"
                    >
                        <option value="fixed">Fixed</option>
                        <option value="sentence">Sentence</option>
                    </select>
                </div>
                <div>
                    <label className="text-muted-foreground mb-1.5 block font-mono text-xs font-semibold tracking-wider md:mb-2 md:text-xs">
                        TOP-K
                    </label>
                    <input
                        type="number"
                        value={settings.topK}
                        onChange={(e) => onUpdateSetting('topK', +e.target.value)}
                        min={1}
                        max={10}
                        className="border-border bg-background text-foreground focus:border-muted-foreground focus:ring-0 w-full border-2 px-2.5 py-1.5 font-mono text-xs font-medium transition-colors outline-none md:px-3 md:py-2 md:text-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="text-muted-foreground mb-1.5 block font-mono text-xs font-semibold tracking-wider md:mb-2 md:text-xs">
                        EMBEDDINGS
                    </label>
                    <div className="border-border bg-muted text-muted-foreground flex h-9 items-center border-2 px-2.5 font-mono text-xs md:h-10 md:px-3 md:text-sm">
                        TF-IDF
                    </div>
                </div>
            </div>
        </div>
    );
}
