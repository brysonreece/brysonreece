import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Asterisk, Bookmark, Clapperboard, FlaskConical, Loader2, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'brando:favorites';

const SAMPLE_DESCRIPTION =
    'A productivity tool for early-stage founders to track decisions, capture context, and stay aligned with their co-founders — even when working async across time zones.';

const TONE_OPTIONS = ['BOLD', 'MINIMAL', 'PLAYFUL', 'PRO'] as const;

const PAGE_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground) / 0.4); }
    ::selection { background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); }

    .brando-font-display { font-family: 'Syne', sans-serif; }
    .brando-font-mono { font-family: 'JetBrains Mono', monospace; }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
    }

    .fade-up  { animation: fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .scale-in { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }

    .brando-grid-bg {
        background-image:
            linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px);
        background-size: 40px 40px;
    }

    .fav-btn { transition: opacity 0.15s, transform 0.15s; }
    .fav-btn:hover { opacity: 1 !important; transform: scale(1.1); }
    .fav-btn:active { transform: scale(0.92); }

    .brando-slider { appearance: none; -webkit-appearance: none; position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; margin: 0; }
    .brando-slider:disabled { cursor: not-allowed; }
`;

interface BrandName {
    name: string;
    tagline: string;
}

type RightTab = 'results' | 'favorites';

function useFavorites() {
    const [favorites, setFavorites] = useState<BrandName[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? (JSON.parse(raw) as BrandName[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggle = (item: BrandName) => {
        setFavorites((prev) =>
            prev.some((f) => f.name === item.name)
                ? prev.filter((f) => f.name !== item.name)
                : [...prev, item],
        );
    };

    const isFavorited = (name: string) => favorites.some((f) => f.name === name);

    return { favorites, toggle, isFavorited };
}

function NameCard({
    brand,
    index,
    isFavorited,
    onToggle,
    animationDelay,
}: {
    brand: BrandName;
    index: number;
    isFavorited: boolean;
    onToggle: (item: BrandName) => void;
    animationDelay?: number;
}) {
    return (
        <div
            className="fade-up border-border group border-2 p-5 transition-colors hover:border-muted-foreground/30"
            style={animationDelay !== undefined ? { animationDelay: `${animationDelay}ms` } : undefined}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h2 className="brando-font-display text-xl font-bold tracking-widest md:text-2xl">
                        {brand.name}
                    </h2>
                    <p className="brando-font-mono text-muted-foreground mt-2 text-xs leading-relaxed tracking-wide">
                        "{brand.tagline}"
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={() => onToggle(brand)}
                        aria-label={isFavorited ? `Remove ${brand.name} from favorites` : `Save ${brand.name} to favorites`}
                        className={`fav-btn cursor-pointer ${isFavorited ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
                    >
                        <Bookmark
                            size={14}
                            strokeWidth={2}
                            className={isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground'}
                        />
                    </button>
                    <span className="brando-font-mono text-muted-foreground/25 text-xs tabular-nums tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Brando(): ReactNode {
    const [description, setDescription] = useState('');
    const [tones, setTones] = useState<Set<string>>(new Set());
    const [count, setCount] = useState(10);
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState<BrandName[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<RightTab>('results');

    const { favorites, toggle: toggleFavorite, isFavorited } = useFavorites();

    const toggleTone = (tone: string) => {
        setTones((prev) => {
            const next = new Set(prev);
            if (next.has(tone)) {
                next.delete(tone);
            } else {
                next.add(tone);
            }
            return next;
        });
    };

    const handleLoadExample = () => {
        setDescription(SAMPLE_DESCRIPTION);
        setResults([]);
        setError(null);
    };

    const handleGenerate = async () => {
        if (!description.trim() || isGenerating) {
            return;
        }

        setIsGenerating(true);
        setResults([]);
        setError(null);
        setActiveTab('results');

        try {
            const { data } = await axios.post<{ names: BrandName[] }>(
                '//brando.bryson.test/generations',
                { description: description.trim(), tones: [...tones], count },
            );
            setResults(data.names);
        } catch (err) {
            const message =
                (err as { response?: { data?: { errors?: Record<string, string[]>; message?: string } } })
                    ?.response?.data?.errors?.description?.[0] ??
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                (err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setError(message);
        } finally {
            setIsGenerating(false);
        }
    };

    const canGenerate = description.trim().length > 0 && !isGenerating;

    return (
        <>
            <Head title="Brando | AI Brand Name Generator" />

            <div className="bg-background text-foreground brando-font-mono flex h-screen flex-col">
                <style>{PAGE_STYLES}</style>

                {/* ── Header ── */}
                <header className="border-border shrink-0 border-b-2">
                    <div className="flex items-center px-4 py-4 md:px-8 md:py-5">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="grid place-items-center">
                                <Clapperboard size={32} strokeWidth={2} className="md:hidden" />
                                <Clapperboard size={40} strokeWidth={2} className="hidden md:block" />
                            </div>
                            <div>
                                <h1 className="brando-font-display text-sm leading-none font-bold tracking-widest md:text-lg">
                                    BRANDO
                                </h1>
                                <p className="text-muted-foreground mt-1 text-xs font-medium tracking-wider md:mt-1.5">
                                    AI BRAND NAME GENERATOR
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Main ── */}
                <main className="flex-1 overflow-hidden">
                    <div className="bg-border grid h-full grid-cols-1 gap-px overflow-hidden lg:grid-cols-[420px_1fr]">

                        {/* ── Left panel: Input ── */}
                        <div className="bg-background flex flex-col overflow-y-auto">

                            {/* Brand identity textarea */}
                            <div className="border-border border-b-2 p-4 md:p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs font-medium tracking-wider">
                                        BRAND IDENTITY
                                    </span>
                                    <button
                                        onClick={handleLoadExample}
                                        disabled={isGenerating}
                                        className={`ml-auto flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wider transition-all ${
                                            !isGenerating
                                                ? 'bg-primary text-primary-foreground hover:opacity-90 cursor-pointer'
                                                : 'bg-background text-muted-foreground/30 cursor-not-allowed'
                                        }`}
                                    >
                                        <FlaskConical size={11} strokeWidth={2.5} />
                                        LOAD EXAMPLE
                                    </button>
                                </div>
                                <div className="border-border border-2 transition-colors focus-within:border-muted-foreground/40">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your brand — what it does, who it's for, the values it stands for, the tone you want to project..."
                                        rows={6}
                                        className="brando-font-mono bg-background text-foreground placeholder:text-muted-foreground/30 w-full resize-none p-3 text-xs leading-relaxed tracking-wide outline-none focus:ring-0 border-0 md:text-sm"
                                    />
                                    <div className="border-border border-t px-3 py-2">
                                        <span className="text-muted-foreground/40 text-xs tabular-nums tracking-wide">
                                            {description.length} CHARS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tone selector */}
                            <div className="border-border border-b-2 p-4 md:p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs font-medium tracking-wider">TONE</span>
                                </div>
                                <div className="border-border flex border-2">
                                    {TONE_OPTIONS.map((tone) => (
                                        <button
                                            key={tone}
                                            onClick={() => toggleTone(tone)}
                                            className={`brando-font-mono flex flex-1 cursor-pointer items-center justify-center py-2.5 text-xs font-medium tracking-wider transition-all ${
                                                tones.has(tone)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-background text-muted-foreground hover:bg-muted'
                                            }`}
                                        >
                                            {tone}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-muted-foreground/40 mt-4 text-center text-xs tracking-wider">
                                    {tones.size === 0 ? 'SELECT ALL THAT APPLY' : [...tones].join(' · ')}
                                </p>
                            </div>

                            {/* Result count slider */}
                            <div className={`border-border border-b-2 p-4 md:p-6 ${isGenerating ? 'opacity-40' : ''}`}>
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-muted-foreground text-xs font-medium tracking-wider">RESULTS</span>
                                    <span className="brando-font-mono text-foreground text-xs font-bold tabular-nums tracking-wider">
                                        {count}
                                    </span>
                                </div>
                                {/* Custom track with overlaid invisible native input */}
                                <div className="relative h-5 cursor-pointer">
                                    {/* Track */}
                                    <div className="bg-foreground/15 absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2" />
                                    {/* Fill */}
                                    <div
                                        className="bg-foreground absolute top-1/2 left-0 h-0.5 -translate-y-1/2"
                                        style={{ width: `${((count - 5) / 15) * 100}%` }}
                                    />
                                    {/* Thumb */}
                                    <div
                                        className="bg-foreground absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                                        style={{ left: `${((count - 5) / 15) * 100}%` }}
                                    />
                                    {/* Native input (invisible, handles interaction) */}
                                    <input
                                        type="range"
                                        min={5}
                                        max={20}
                                        step={1}
                                        value={count}
                                        onChange={(e) => setCount(Number(e.target.value))}
                                        disabled={isGenerating}
                                        className="brando-slider"
                                    />
                                </div>
                                <div className="text-muted-foreground/40 mt-1 flex justify-between text-xs tabular-nums tracking-wide">
                                    <span>5</span>
                                    <span>20</span>
                                </div>
                            </div>

                            {/* Generate button */}
                            <div className="p-4 md:p-6">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!canGenerate}
                                    className={`flex w-full cursor-pointer items-center justify-center gap-3 py-3.5 text-sm font-semibold tracking-widest transition-all md:py-4 ${
                                        canGenerate
                                            ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]'
                                            : 'bg-primary opacity-20 dark:bg-muted dark:opacity-100 text-white dark:text-muted-foreground cursor-not-allowed'
                                    }`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={15} className="animate-spin [animation-duration:1.2s]" />
                                            GENERATING NAMES...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={15} strokeWidth={2.5} />
                                            GENERATE NAMES
                                        </>
                                    )}
                                </button>

                                {!description.trim() && (
                                    <p className="text-muted-foreground/50 mt-3 text-center text-xs tracking-wide">
                                        Describe your brand to begin
                                    </p>
                                )}

                                {error && (
                                    <p className="text-destructive mt-3 text-center text-xs tracking-wide">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ── Right panel: Results / Favorites ── */}
                        <div className="bg-background flex flex-col overflow-hidden">

                            {/* Tab bar */}
                            <div className="border-border shrink-0 border-b-2">
                                <div className="flex">
                                    <button
                                        onClick={() => setActiveTab('results')}
                                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                            activeTab === 'results'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Sparkles size={11} strokeWidth={2.5} />
                                        GENERATED NAMES
                                        {results.length > 0 && (
                                            <span className={`tabular-nums ${activeTab === 'results' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                                                {results.length}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('favorites')}
                                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                            activeTab === 'favorites'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Bookmark size={11} strokeWidth={2.5} />
                                        FAVORITES
                                        {favorites.length > 0 && (
                                            <span className={`tabular-nums ${activeTab === 'favorites' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                                                {favorites.length}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Panel content */}
                            <div className="relative flex-1 overflow-y-auto">

                                {/* ── Results tab ── */}
                                {activeTab === 'results' && (
                                    <>
                                        {/* Empty / idle state */}
                                        {!isGenerating && results.length === 0 && (
                                            <div className="brando-grid-bg absolute inset-0 flex flex-col items-center justify-center gap-6">
                                                <div className="border-border grid h-20 w-20 place-items-center border-2">
                                                    <Asterisk size={32} strokeWidth={1} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-muted-foreground/40 text-sm font-medium tracking-widest">
                                                        AWAITING GENERATION
                                                    </p>
                                                    <p className="text-muted-foreground/25 mt-1.5 text-xs tracking-wide">
                                                        {count} BRAND NAMES WILL APPEAR HERE
                                                    </p>
                                                </div>
                                                <div className="border-muted-foreground/10 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
                                                <div className="border-muted-foreground/10 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
                                                <div className="border-muted-foreground/10 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
                                                <div className="border-muted-foreground/10 absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2" />
                                            </div>
                                        )}

                                        {/* Loading skeleton */}
                                        {isGenerating && (
                                            <div className="space-y-3 p-4 md:p-6">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="border-border animate-pulse border-2 p-5"
                                                        style={{ animationDelay: `${i * 100}ms` }}
                                                    >
                                                        <div className="bg-muted/60 mb-3 h-6 w-2/5 rounded-sm" />
                                                        <div className="bg-muted/40 h-3 w-3/4 rounded-sm" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Results list */}
                                        {!isGenerating && results.length > 0 && (
                                            <div className="space-y-3 p-4 md:p-6">
                                                {results.map((brand, i) => (
                                                    <NameCard
                                                        key={brand.name}
                                                        brand={brand}
                                                        index={i}
                                                        isFavorited={isFavorited(brand.name)}
                                                        onToggle={toggleFavorite}
                                                        animationDelay={i * 80}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* ── Favorites tab ── */}
                                {activeTab === 'favorites' && (
                                    <>
                                        {favorites.length === 0 ? (
                                            <div className="brando-grid-bg absolute inset-0 flex flex-col items-center justify-center gap-6">
                                                <div className="border-border grid h-20 w-20 place-items-center border-2 opacity-25">
                                                    <Bookmark size={32} strokeWidth={1} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-muted-foreground/40 text-sm font-medium tracking-widest">
                                                        NO FAVORITES YET
                                                    </p>
                                                    <p className="text-muted-foreground/25 mt-1.5 text-xs tracking-wide">
                                                        BOOKMARK NAMES FROM YOUR RESULTS
                                                    </p>
                                                </div>
                                                <div className="border-muted-foreground/10 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
                                                <div className="border-muted-foreground/10 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
                                                <div className="border-muted-foreground/10 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
                                                <div className="border-muted-foreground/10 absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2" />
                                            </div>
                                        ) : (
                                            <div className="space-y-3 p-4 md:p-6">
                                                {favorites.map((brand, i) => (
                                                    <NameCard
                                                        key={brand.name}
                                                        brand={brand}
                                                        index={i}
                                                        isFavorited={true}
                                                        onToggle={toggleFavorite}
                                                        animationDelay={i * 40}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── Footer ── */}
                <footer className="border-border border-t px-4 py-3 md:px-8 md:py-5">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-0">
                        <span className="text-muted-foreground/40 text-xs font-medium tracking-wide">
                            BRANDO · AI BRAND NAME GENERATOR
                        </span>
                        <a
                            href="https://bryson.cc"
                            target="_blank"
                            className="text-muted-foreground/40 hover:text-muted-foreground text-xs font-medium tracking-wide md:text-right"
                        >
                            BRYSON.CC
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}

Brando.layout = (children: ReactNode | undefined) => <>{children}</>;
