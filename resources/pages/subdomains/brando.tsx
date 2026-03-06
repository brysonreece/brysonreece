import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Asterisk, Bookmark, Clapperboard, ChevronLeft, ChevronRight, FlaskConical, ImageIcon, Loader2, Sparkles, Type, Wand2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const STORAGE_KEY = 'brando:favorites';

const SAMPLE_DESCRIPTION =
    'A productivity tool for early-stage founders to track decisions, capture context, and stay aligned with their co-founders — even when working async across time zones.';

const SAMPLE_LOGO_NAME = 'Zest';
const SAMPLE_LOGO_TAGLINE = 'Make big decisions with small-team speed.';

const STYLE_OPTIONS = ['BOLD', 'MINIMAL', 'PLAYFUL', 'ELEGANT'] as const;
const IMAGE_POLLING_INTERVAL = 5000;

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

    .output-slot:hover .output-slot-overlay { opacity: 1; }
`;

interface BrandName {
    name: string;
    tagline: string;
}

interface GeneratedLogo {
    id: string;
    url: string;
    label: string;
}

type LeftTab = 'names' | 'logo';
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

function toggleSetItem<T>(set: Set<T>, item: T): Set<T> {
    const next = new Set(set);
    if (next.has(item)) {
        next.delete(item);
    } else {
        next.add(item);
    }
    return next;
}

function extractErrorMessage(err: unknown, primaryField: string): string {
    const response = (err as { response?: { data?: { errors?: Record<string, string[]>; message?: string } } })?.response;
    return (
        response?.data?.errors?.[primaryField]?.[0] ??
        response?.data?.message ??
        (err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    );
}

function Slider({
    value,
    onChange,
    min,
    max,
    disabled,
}: {
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    disabled?: boolean;
}) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="relative h-5 cursor-pointer">
            <div className="bg-foreground/15 absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2" />
            <div className="bg-foreground absolute top-1/2 left-0 h-0.5 -translate-y-1/2" style={{ width: `${pct}%` }} />
            <div className="bg-foreground absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2" style={{ left: `${pct}%` }} />
            <input
                type="range"
                min={min}
                max={max}
                step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                className="brando-slider"
            />
        </div>
    );
}

function StyleSelector({
    selected,
    onChange,
}: {
    selected: Set<string>;
    onChange: (next: Set<string>) => void;
}) {
    return (
        <>
            <div className="border-border flex border-2">
                {STYLE_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => onChange(toggleSetItem(selected, s))}
                        className={`brando-font-mono flex flex-1 cursor-pointer items-center justify-center py-2.5 text-xs font-medium tracking-wider transition-all ${
                            selected.has(s)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background text-muted-foreground hover:bg-muted'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
            <p className="text-muted-foreground/40 mt-4 text-center text-xs tracking-wider">
                {selected.size === 0 ? 'SELECT ALL THAT APPLY' : [...selected].join(' \u00b7 ')}
            </p>
        </>
    );
}

function EmptyState({ icon, title, subtitle, dimIcon }: { icon: ReactNode; title: string; subtitle: string; dimIcon?: boolean }) {
    return (
        <div className="brando-grid-bg absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className={`border-border grid h-20 w-20 place-items-center border-2${dimIcon ? ' opacity-25' : ''}`}>
                {icon}
            </div>
            <div className="text-center">
                <p className="text-muted-foreground/40 text-sm font-medium tracking-widest">{title}</p>
                <p className="text-muted-foreground/25 mt-1.5 text-xs tracking-wide">{subtitle}</p>
            </div>
            <div className="border-muted-foreground/10 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
            <div className="border-muted-foreground/10 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
            <div className="border-muted-foreground/10 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
            <div className="border-muted-foreground/10 absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2" />
        </div>
    );
}

function NameCard({
    brand,
    index,
    isFavorited,
    onToggle,
    onLogoClick,
    animationDelay,
}: {
    brand: BrandName;
    index: number;
    isFavorited: boolean;
    onToggle: (item: BrandName) => void;
    onLogoClick?: (brand: BrandName) => void;
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
                    {onLogoClick && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => onLogoClick(brand)}
                                    aria-label={`Generate a logo for ${brand.name}`}
                                    className="fav-btn cursor-pointer opacity-0 group-hover:opacity-40"
                                >
                                    <Wand2 size={14} strokeWidth={2} className="text-muted-foreground" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Generate Logo</TooltipContent>
                        </Tooltip>
                    )}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => onToggle(brand)}
                                aria-label={isFavorited ? `Remove ${brand.name} from Favorites` : `Save ${brand.name} to Favorites`}
                                className={`fav-btn cursor-pointer ${isFavorited ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
                            >
                                <Bookmark
                                    size={14}
                                    strokeWidth={2}
                                    className={isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground'}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>{isFavorited ? 'Remove from Favorites' : 'Save to Favorites'}</TooltipContent>
                    </Tooltip>
                    <span className="brando-font-mono text-muted-foreground/25 text-xs tabular-nums tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Brando(): ReactNode {
    // Names state
    const [description, setDescription] = useState('');
    const [nameStyles, setNameStyles] = useState<Set<string>>(new Set());
    const [nameCount, setNameCount] = useState(10);
    const [isGeneratingNames, setIsGeneratingNames] = useState(false);
    const [nameResults, setNameResults] = useState<BrandName[]>([]);
    const [nameError, setNameError] = useState<string | null>(null);

    // Logo state
    const [logoName, setLogoName] = useState('');
    const [logoTagline, setLogoTagline] = useState('');
    const [logoDescription, setLogoDescription] = useState('');
    const [logoStyles, setLogoStyles] = useState<Set<string>>(new Set());
    const [logoCount, setLogoCount] = useState(3);
    const [isGeneratingLogos, setIsGeneratingLogos] = useState(false);
    const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>([]);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [logoError, setLogoError] = useState<string | null>(null);
    const [batchProgress, setBatchProgress] = useState(0);
    const [batchStatus, setBatchStatus] = useState<'queued' | 'generating' | 'complete'>('queued');
    const [inProgressLogos, setInProgressLogos] = useState<string[]>([]);

    // Tab state
    const [leftTab, setLeftTab] = useState<LeftTab>('names');
    const [rightTab, setRightTab] = useState<RightTab>('results');

    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { favorites, toggle: toggleFavorite, isFavorited } = useFavorites();

    const stopPolling = useCallback(() => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
    }, []);

    const startPolling = useCallback(
        (batchId: string) => {
            stopPolling();
            pollRef.current = setInterval(async () => {
                try {
                    const { data } = await axios.get<{
                        status: 'pending' | 'complete' | 'failed';
                        progress: number;
                        total: number;
                        images: { url: string }[];
                    }>(`/logo/generations/${batchId}`);

                    const pct = data.total > 0 ? Math.round((data.progress / data.total) * 100) : 0;
                    setBatchProgress(pct);
                    setBatchStatus(pct > 0 ? 'complete' : 'generating');
                    setInProgressLogos(data.images.map((img) => img.url));

                    if (data.status === 'complete') {
                        stopPolling();
                        setGeneratedLogos(
                            data.images.map((img, i) => ({
                                id: String(i + 1),
                                url: img.url,
                                label: `Logo ${String(i + 1).padStart(2, '0')}`,
                            })),
                        );
                        setIsGeneratingLogos(false);
                    } else if (data.status === 'failed') {
                        stopPolling();
                        setLogoError('Logo generation failed. Please try again.');
                        setIsGeneratingLogos(false);
                    }
                } catch {
                    stopPolling();
                    setLogoError('Lost connection while generating. Please try again.');
                    setIsGeneratingLogos(false);
                }
            }, IMAGE_POLLING_INTERVAL);
        },
        [stopPolling],
    );

    useEffect(() => {
        return () => stopPolling();
    }, [stopPolling]);

    const handleLoadNameExample = () => {
        setDescription(SAMPLE_DESCRIPTION);
        setNameStyles(new Set(['MINIMAL', 'PLAYFUL']));
        setNameResults([]);
        setNameError(null);
    };

    const handleLoadLogoExample = () => {
        setLogoName(SAMPLE_LOGO_NAME);
        setLogoTagline(SAMPLE_LOGO_TAGLINE);
        setLogoDescription(SAMPLE_DESCRIPTION);
        setLogoStyles(new Set(['MINIMAL', 'PLAYFUL']));
        setGeneratedLogos([]);
        setLogoError(null);
    };

    const handleGenerateNames = async () => {
        if (!description.trim() || isGeneratingNames) {
            return;
        }

        setIsGeneratingNames(true);
        setNameResults([]);
        setNameError(null);
        setRightTab('results');

        try {
            const { data } = await axios.post<{ names: BrandName[] }>(
                '//brando.bryson.test/generations',
                { description: description.trim(), tones: [...nameStyles], count: nameCount },
            );
            setNameResults(data.names);
        } catch (err) {
            setNameError(extractErrorMessage(err, 'description'));
        } finally {
            setIsGeneratingNames(false);
        }
    };

    const handleGenerateLogos = async () => {
        if (!logoName.trim() || isGeneratingLogos) {
            return;
        }

        setIsGeneratingLogos(true);
        setGeneratedLogos([]);
        setCarouselIndex(0);
        setLogoError(null);
        setBatchProgress(0);
        setBatchStatus('queued');
        setInProgressLogos([]);
        setRightTab('results');

        try {
            const { data } = await axios.post<{ batchId: string }>('/logo/generations', {
                name: logoName.trim(),
                tagline: logoTagline.trim() || null,
                description: logoDescription.trim() || null,
                count: logoCount,
                styles: [...logoStyles],
                quality: 'medium',
            });
            startPolling(data.batchId);
        } catch (err) {
            setLogoError(extractErrorMessage(err, 'name'));
            setIsGeneratingLogos(false);
        }
    };

    const handleNameCardLogoClick = (brand: BrandName) => {
        setLogoName(brand.name);
        setLogoTagline(brand.tagline);
        setLogoDescription(description.trim());
        setLogoStyles(new Set(nameStyles));
        setLeftTab('logo');
    };

    const canGenerateNames = description.trim().length > 0 && !isGeneratingNames;
    const canGenerateLogos = logoName.trim().length > 0 && !isGeneratingLogos;
    const totalSlides = generatedLogos.length;
    const prevSlide = () => setCarouselIndex((i) => Math.max(0, i - 1));
    const nextSlide = () => setCarouselIndex((i) => Math.min(totalSlides - 1, i + 1));

    return (
        <>
            <Head title="Brando | AI Brand Generator" />

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
                                    AI BRAND GENERATOR
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Main ── */}
                <main className="flex-1 overflow-hidden">
                    <div className="bg-border grid h-full grid-cols-1 gap-px overflow-hidden lg:grid-cols-[420px_1fr]">

                        {/* ── Left panel ── */}
                        <div className="bg-background flex flex-col overflow-hidden">

                            {/* Left tab bar */}
                            <div className="border-border shrink-0 border-b-2">
                                <div className="flex">
                                    <button
                                        onClick={() => setLeftTab('names')}
                                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                            leftTab === 'names'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Type size={11} strokeWidth={2.5} />
                                        NAMES
                                    </button>
                                    <button
                                        onClick={() => { setLeftTab('logo'); setRightTab('results'); }}
                                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                            leftTab === 'logo'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <ImageIcon size={11} strokeWidth={2.5} />
                                        LOGOS
                                    </button>
                                </div>
                            </div>

                            {/* Left panel content */}
                            <div className="flex-1 overflow-y-auto">

                                {/* ── Names inputs ── */}
                                {leftTab === 'names' && (
                                    <>
                                        {/* Brand identity textarea */}
                                        <div className="border-border border-b-2 p-4 md:p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">
                                                    BRAND IDENTITY
                                                </span>
                                                <button
                                                    onClick={handleLoadNameExample}
                                                    disabled={isGeneratingNames}
                                                    className={`ml-auto flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wider transition-all ${
                                                        !isGeneratingNames
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

                                        {/* Style selector */}
                                        <div className="border-border border-b-2 p-4 md:p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">STYLE</span>
                                            </div>
                                            <StyleSelector selected={nameStyles} onChange={setNameStyles} />
                                        </div>

                                        {/* Result count slider */}
                                        <div className={`border-border border-b-2 p-4 md:p-6 ${isGeneratingNames ? 'opacity-40' : ''}`}>
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">RESULTS</span>
                                                <span className="brando-font-mono text-foreground text-xs font-bold tabular-nums tracking-wider">
                                                    {nameCount}
                                                </span>
                                            </div>
                                            <Slider value={nameCount} onChange={setNameCount} min={5} max={20} disabled={isGeneratingNames} />
                                            <div className="text-muted-foreground/40 mt-1 flex justify-between text-xs tabular-nums tracking-wide">
                                                <span>5</span>
                                                <span>20</span>
                                            </div>
                                        </div>

                                        {/* Generate button */}
                                        <div className="p-4 md:p-6">
                                            <button
                                                onClick={handleGenerateNames}
                                                disabled={!canGenerateNames}
                                                className={`flex w-full cursor-pointer items-center justify-center gap-3 py-3.5 text-sm font-semibold tracking-widest transition-all md:py-4 ${
                                                    canGenerateNames
                                                        ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]'
                                                        : 'bg-primary opacity-20 dark:bg-muted dark:opacity-100 text-white dark:text-muted-foreground cursor-not-allowed'
                                                }`}
                                            >
                                                {isGeneratingNames ? (
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

                                            {nameError && (
                                                <p className="text-destructive mt-3 text-center text-xs tracking-wide">
                                                    {nameError}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* ── Logo inputs ── */}
                                {leftTab === 'logo' && (
                                    <>
                                        {/* Brand name + tagline */}
                                        <div className="border-border border-b-2 p-4 md:p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">BRAND NAME</span>
                                                <button
                                                    onClick={handleLoadLogoExample}
                                                    disabled={isGeneratingLogos}
                                                    className={`ml-auto flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wider transition-all ${
                                                        !isGeneratingLogos
                                                            ? 'bg-primary text-primary-foreground hover:opacity-90 cursor-pointer'
                                                            : 'bg-background text-muted-foreground/30 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <FlaskConical size={11} strokeWidth={2.5} />
                                                    LOAD EXAMPLE
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={logoName}
                                                onChange={(e) => setLogoName(e.target.value)}
                                                placeholder="e.g. Cozmic, Decisio, RelayFlow..."
                                                className="brando-font-mono bg-background border-border border-2 text-foreground placeholder:text-muted-foreground/30 w-full p-3 text-xs tracking-wide outline-none md:text-sm focus:ring-0 focus:border-muted-foreground/40"
                                            />

                                            <div className="mt-6 mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">TAGLINE</span>
                                                <span className="text-muted-foreground/40 text-xs tracking-wider">OPTIONAL</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={logoTagline}
                                                onChange={(e) => setLogoTagline(e.target.value)}
                                                placeholder="One-line brand tagline..."
                                                className="brando-font-mono bg-background border-border border-2 text-foreground placeholder:text-muted-foreground/30 w-full p-3 text-xs tracking-wide outline-none md:text-sm focus:ring-0 focus:border-muted-foreground/40"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="border-border border-b-2 p-4 md:p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">BRAND DESCRIPTION</span>
                                                <span className="text-muted-foreground/40 text-xs tracking-wider">OPTIONAL</span>
                                            </div>
                                            <div className="border-border border-2 transition-colors focus-within:border-muted-foreground/40">
                                                <textarea
                                                    value={logoDescription}
                                                    onChange={(e) => setLogoDescription(e.target.value)}
                                                    placeholder="Describe your brand's identity, values, and audience..."
                                                    rows={4}
                                                    className="brando-font-mono bg-background text-foreground placeholder:text-muted-foreground/30 w-full resize-none p-3 text-xs leading-relaxed tracking-wide outline-none focus:ring-0 border-0 md:text-sm"
                                                />
                                                <div className="border-border border-t px-3 py-2">
                                                    <span className="text-muted-foreground/40 text-xs tabular-nums tracking-wide">
                                                        {logoDescription.length} CHARS
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Style */}
                                        <div className="border-border border-b-2 p-4 md:p-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">STYLE</span>
                                                <span className="text-muted-foreground/40 text-xs tracking-wider">OPTIONAL</span>
                                            </div>
                                            <StyleSelector selected={logoStyles} onChange={setLogoStyles} />
                                        </div>

                                        {/* Logo count slider */}
                                        <div className={`border-border border-b-2 p-4 md:p-6 ${isGeneratingLogos ? 'opacity-40' : ''}`}>
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs font-medium tracking-wider">LOGOS</span>
                                                <span className="brando-font-mono text-foreground text-xs font-bold tabular-nums tracking-wider">
                                                    {logoCount}
                                                </span>
                                            </div>
                                            <Slider value={logoCount} onChange={(v) => { setLogoCount(v); setCarouselIndex(0); }} min={1} max={5} disabled={isGeneratingLogos} />
                                            <div className="text-muted-foreground/40 mt-1 flex justify-between text-xs tabular-nums tracking-wide">
                                                <span>1</span>
                                                <span>5</span>
                                            </div>
                                        </div>

                                        {/* Generate button */}
                                        <div className="p-4 md:p-6">
                                            <button
                                                onClick={handleGenerateLogos}
                                                disabled={!canGenerateLogos}
                                                className={`flex w-full cursor-pointer items-center justify-center gap-3 py-3.5 text-sm font-semibold tracking-widest transition-all md:py-4 ${
                                                    canGenerateLogos
                                                        ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]'
                                                        : 'bg-primary opacity-20 dark:bg-muted dark:opacity-100 text-white dark:text-muted-foreground cursor-not-allowed'
                                                }`}
                                            >
                                                {isGeneratingLogos ? (
                                                    <>
                                                        <Loader2 size={15} className="animate-spin [animation-duration:1.2s]" />
                                                        GENERATING LOGOS...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={15} strokeWidth={2.5} />
                                                        GENERATE {logoCount !== 1 ? `${logoCount} ` : ''}LOGO{logoCount !== 1 ? 'S' : ''}
                                                    </>
                                                )}
                                            </button>

                                            {!logoName.trim() && (
                                                <p className="text-muted-foreground/50 mt-3 text-center text-xs tracking-wide">
                                                    Enter a brand name to begin
                                                </p>
                                            )}

                                            {logoError && (
                                                <p className="text-destructive mt-3 text-center text-xs tracking-wide">
                                                    {logoError}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── Right panel ── */}
                        <div className="bg-background flex flex-col overflow-hidden">

                            {/* Right tab bar */}
                            <div className="border-border shrink-0 border-b-2">
                                <div className="flex">
                                    <button
                                        onClick={() => setRightTab('results')}
                                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                            rightTab === 'results'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Sparkles size={11} strokeWidth={2.5} />
                                        RESULTS
                                        {leftTab === 'names' && nameResults.length > 0 && (
                                            <span className={`tabular-nums ${rightTab === 'results' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                                                {nameResults.length}
                                            </span>
                                        )}
                                        {leftTab === 'logo' && generatedLogos.length > 0 && (
                                            <span className={`tabular-nums ${rightTab === 'results' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                                                {generatedLogos.length}
                                            </span>
                                        )}
                                    </button>
                                    {leftTab === 'names' && (
                                        <button
                                            onClick={() => setRightTab('favorites')}
                                            className={`flex cursor-pointer items-center gap-2 px-4 py-3 text-xs font-medium tracking-wider transition-colors md:px-6 md:py-4 ${
                                                rightTab === 'favorites'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        >
                                            <Bookmark size={11} strokeWidth={2.5} />
                                            FAVORITES
                                            {favorites.length > 0 && (
                                                <span className={`tabular-nums ${rightTab === 'favorites' ? 'text-primary-foreground/60' : 'text-muted-foreground/50'}`}>
                                                    {favorites.length}
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Panel content */}
                            <div className="relative flex-1 overflow-y-auto">

                                {/* ── Results tab ── */}
                                {rightTab === 'results' && (
                                    <>
                                        {/* Names results */}
                                        {leftTab === 'names' && (
                                            <>
                                                {!isGeneratingNames && nameResults.length === 0 && (
                                                    <EmptyState
                                                        icon={<Asterisk size={32} strokeWidth={1} />}
                                                        title="AWAITING GENERATION"
                                                        subtitle={`${nameCount} BRAND NAMES WILL APPEAR HERE`}
                                                    />
                                                )}

                                                {isGeneratingNames && (
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

                                                {!isGeneratingNames && nameResults.length > 0 && (
                                                    <div className="space-y-3 p-4 md:p-6">
                                                        {nameResults.map((brand, i) => (
                                                            <NameCard
                                                                key={brand.name}
                                                                brand={brand}
                                                                index={i}
                                                                isFavorited={isFavorited(brand.name)}
                                                                onToggle={toggleFavorite}
                                                                onLogoClick={handleNameCardLogoClick}
                                                                animationDelay={i * 80}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Logo results */}
                                        {leftTab === 'logo' && (
                                            <div className="relative h-full overflow-hidden">
                                                {!isGeneratingLogos && generatedLogos.length === 0 && (
                                                    <EmptyState
                                                        icon={<ImageIcon size={32} strokeWidth={1} />}
                                                        title="AWAITING GENERATION"
                                                        subtitle={`${logoCount !== 1 ? `${logoCount} ` : ''}LOGO${logoCount !== 1 ? 'S' : ''} WILL APPEAR HERE`}
                                                        dimIcon
                                                    />
                                                )}

                                                {isGeneratingLogos && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
                                                        <div className="flex gap-2">
                                                            {Array.from({ length: logoCount }).map((_, i) =>
                                                                inProgressLogos[i] ? (
                                                                    <img
                                                                        key={i}
                                                                        src={inProgressLogos[i]}
                                                                        className="border-border border-2 object-cover"
                                                                        style={{ width: 56, height: 56 }}
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        key={i}
                                                                        className="border-border bg-muted/50 animate-pulse border-2"
                                                                        style={{ width: 56, height: 56, animationDelay: `${i * 150}ms` }}
                                                                    />
                                                                ),
                                                            )}
                                                        </div>

                                                        <div className="w-full max-w-md space-y-2">
                                                            {logoCount > 1 && (
                                                                <div className="border-border h-1.5 w-full overflow-hidden border">
                                                                    <div
                                                                        className="bg-primary h-full transition-all duration-500 ease-out"
                                                                        style={{ width: `${batchProgress}%` }}
                                                                    />
                                                                </div>
                                                            )}
                                                            <p className="text-muted-foreground/40 brando-font-mono text-center text-xs tracking-widest">
                                                                {batchStatus === 'queued' ? 'QUEUED...' : 'GENERATING...'}
                                                                {batchStatus === 'generating' && logoCount > 1 && ` ${batchProgress}%`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {!isGeneratingLogos && generatedLogos.length > 0 && (
                                                    <div className="flex h-full flex-col">
                                                        <div className="relative flex-1 overflow-hidden p-4 md:p-8">
                                                            <div className="output-slot fade-up relative h-full overflow-hidden" key={carouselIndex}>
                                                                <img
                                                                    src={generatedLogos[carouselIndex]?.url}
                                                                    alt={generatedLogos[carouselIndex]?.label}
                                                                    className="h-full w-full object-contain"
                                                                />
                                                                <div className="output-slot-overlay absolute right-2 bottom-2 opacity-0 transition-opacity duration-200">
                                                                    <div className="bg-background/90 border-border border px-2 py-1 backdrop-blur-sm">
                                                                        <span className="text-muted-foreground text-xs tracking-wider">
                                                                            {generatedLogos[carouselIndex]?.label}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {generatedLogos.length > 1 && (
                                                            <div className="border-border shrink-0 border-t-2 px-4 py-3 md:px-6 md:py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        onClick={prevSlide}
                                                                        disabled={carouselIndex === 0}
                                                                        className="border-border bg-background hover:bg-muted grid h-9 w-9 shrink-0 cursor-pointer place-items-center border-2 transition-all disabled:cursor-default disabled:opacity-30"
                                                                    >
                                                                        <ChevronLeft size={14} strokeWidth={2.5} />
                                                                    </button>

                                                                    <div className="flex flex-1 justify-center gap-2">
                                                                        {generatedLogos.map((logo, i) => (
                                                                            <button
                                                                                key={logo.id}
                                                                                onClick={() => setCarouselIndex(i)}
                                                                                className={`cursor-pointer overflow-hidden border-2 transition-all shrink-0 ${
                                                                                    i === carouselIndex
                                                                                        ? 'border-primary scale-105'
                                                                                        : 'border-border hover:border-muted-foreground/50 opacity-60 hover:opacity-80'
                                                                                }`}
                                                                                style={{ width: 56, height: 56 }}
                                                                                title={logo.label}
                                                                            >
                                                                                <img
                                                                                    src={logo.url}
                                                                                    alt={logo.label}
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            </button>
                                                                        ))}
                                                                    </div>

                                                                    <button
                                                                        onClick={nextSlide}
                                                                        disabled={carouselIndex === totalSlides - 1}
                                                                        className="border-border bg-background hover:bg-muted grid h-9 w-9 shrink-0 cursor-pointer place-items-center border-2 transition-all disabled:cursor-default disabled:opacity-30"
                                                                    >
                                                                        <ChevronRight size={14} strokeWidth={2.5} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* ── Favorites tab ── */}
                                {rightTab === 'favorites' && (
                                    <>
                                        {favorites.length === 0 ? (
                                            <EmptyState
                                                icon={<Bookmark size={32} strokeWidth={1} />}
                                                title="NO FAVORITES YET"
                                                subtitle="BOOKMARK NAMES FROM YOUR RESULTS"
                                                dimIcon
                                            />
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
                            BRANDO · AI BRAND GENERATOR
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
