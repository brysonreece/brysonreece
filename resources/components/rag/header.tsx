import type { RagSettings } from '@/lib/rag/types';
import { Eye, EyeOff, Key, Layers, Settings, X } from 'lucide-react';

import { SettingsPanel } from './settings-panel';

interface HeaderProps {
    apiKey: string;
    showKey: boolean;
    showSettings: boolean;
    settings: RagSettings;
    onApiKeyChange: (value: string) => void;
    onClearApiKey: () => void;
    onToggleShowKey: () => void;
    onToggleSettings: () => void;
    onUpdateSetting: <K extends keyof RagSettings>(key: K, value: RagSettings[K]) => void;
}

export function Header({
    apiKey,
    showKey,
    showSettings,
    settings,
    onApiKeyChange,
    onClearApiKey,
    onToggleShowKey,
    onToggleSettings,
    onUpdateSetting,
}: HeaderProps): React.ReactNode {
    return (
        <header className="border-border shrink-0 border-b-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6 md:px-8 md:py-5">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="border-primary grid h-8 w-8 place-items-center border-2 md:h-10 md:w-10">
                        <Layers size={14} strokeWidth={2.5} className="md:hidden" />
                        <Layers size={18} strokeWidth={2.5} className="hidden md:block" />
                    </div>
                    <div>
                        <h1 className="text-sm leading-none font-bold tracking-wider md:text-lg">RECALL</h1>
                        <p className="text-muted-foreground mt-1 text-xs font-medium tracking-wider md:mt-1.5 md:text-xs">
                            CLIENT-SIDE RETRIEVAL-AUGMENTED GENERATION
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="border-border relative flex flex-1 items-center border md:flex-initial">
                        <Key size={12} className="text-muted-foreground absolute left-2 md:left-3 md:size-3.5" />
                        <input
                            type={showKey ? 'text' : 'password'}
                            value={apiKey}
                            onChange={(e) => onApiKeyChange(e.target.value)}
                            placeholder="sk-ant-..."
                            spellCheck="false"
                            className="border-border bg-background text-foreground placeholder:text-muted-foreground/30 focus:border-muted-foreground focus:ring-0 focus:border-2 focus:-my-px w-full px-8 py-2 pr-8 font-mono text-xs transition-colors outline-none md:w-64 md:px-10 md:py-2.5 md:pr-10 md:text-sm"
                        />
                        <button
                            onClick={onToggleShowKey}
                            className="hover:bg-muted absolute right-1.5 flex cursor-pointer border-none bg-transparent p-1 transition-colors md:right-2"
                        >
                            <EyeOff size={12} className="text-muted-foreground md:hidden" />
                            <Eye size={12} className="text-muted-foreground md:hidden" />
                            {showKey ? (
                                <EyeOff size={14} className="text-muted-foreground hidden md:block" />
                            ) : (
                                <Eye size={14} className="text-muted-foreground hidden md:block" />
                            )}
                        </button>
                    </div>
                    {apiKey && (
                        <button
                            onClick={onClearApiKey}
                            className="border-border bg-background hover:bg-muted grid h-10 w-10 cursor-pointer place-items-center border-2 transition-all md:h-11 md:w-11"
                        >
                            <X size={14} strokeWidth={2.5} className="text-muted-foreground md:hidden" />
                            <X size={16} strokeWidth={2.5} className="text-muted-foreground hidden md:block" />
                        </button>
                    )}
                    <button
                        onClick={onToggleSettings}
                        className={`border-border grid h-10 w-10 cursor-pointer place-items-center border-2 transition-all md:h-11 md:w-11 ${showSettings ? 'bg-primary' : 'bg-background hover:bg-muted'}`}
                    >
                        <Settings
                            size={14}
                            strokeWidth={2.5}
                            className={`md:hidden ${showSettings ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                        />
                        <Settings
                            size={16}
                            strokeWidth={2.5}
                            className={`hidden md:block ${showSettings ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                        />
                    </button>
                </div>
            </div>

            {showSettings && <SettingsPanel settings={settings} onUpdateSetting={onUpdateSetting} />}
        </header>
    );
}
