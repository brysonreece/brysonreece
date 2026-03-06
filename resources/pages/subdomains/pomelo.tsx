import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, FlaskConical, ImageIcon, Loader2, Sparkles, Upload, X, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';

const SAMPLE_IMAGE_URL = 'https://bryson.test/storage/img/pomelo/sunscreen.jpg';
const SAMPLE_PROMPT = 'Show the sunscreen bottle on a sunny beach with a towel and umbrella adorning the immediate vicinity. The ocean is situated far behind the product, with people splashing around enjoying the sun. Medium focus, soft bokeh.';

const PAGE_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground) / 0.4); }
    ::selection { background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); }

    .pomelo-font-display { font-family: 'Syne', sans-serif; }
    .pomelo-font-mono { font-family: 'JetBrains Mono', monospace; }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
    }

    .fade-up    { animation: fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
    .scale-in   { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }

    .pomelo-grid-bg {
        background-image:
            linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px);
        background-size: 40px 40px;
    }

    .output-slot:hover .output-slot-overlay {
        opacity: 1;
    }
`;

interface GeneratedImage {
    id: string;
    url: string;
    label: string;
}

const PLACEHOLDER_IMAGES: GeneratedImage[] = [
    { id: '1', url: '', label: 'Variation 01' },
    { id: '2', url: '', label: 'Variation 02' },
    { id: '3', url: '', label: 'Variation 03' },
];

export default function Pomelo(): ReactNode {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [outputCount, setOutputCount] = useState(3);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target?.result as string);
            setUploadedFileName(file.name);
            setGeneratedImages([]);
            setCarouselIndex(0);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFile(file);
            }
        },
        [handleFile],
    );

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleLoadExample = () => {
        setUploadedImage(SAMPLE_IMAGE_URL);
        setUploadedFileName('sunscreen.jpg');
        setPrompt(SAMPLE_PROMPT);
        setGeneratedImages([]);
        setCarouselIndex(0);
    };

    const handleClearImage = () => {
        setUploadedImage(null);
        setUploadedFileName('');
        setGeneratedImages([]);
        setCarouselIndex(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleGenerate = () => {
        if (!uploadedImage) {
            return;
        }
        setIsGenerating(true);
        setGeneratedImages([]);
        setCarouselIndex(0);

        // Stub: simulate async generation
        setTimeout(() => {
            const placeholders: GeneratedImage[] = Array.from({ length: outputCount }, (_, i) => ({
                id: String(i + 1),
                url: uploadedImage,
                label: `Variation ${String(i + 1).padStart(2, '0')}`,
            }));
            setGeneratedImages(placeholders);
            setIsGenerating(false);
        }, 2200);
    };

    const canGenerate = !!uploadedImage && !isGenerating;

    const totalSlides = generatedImages.length || outputCount;
    const displayImages = generatedImages.length > 0 ? generatedImages : PLACEHOLDER_IMAGES.slice(0, outputCount);

    const prevSlide = () => setCarouselIndex((i) => Math.max(0, i - 1));
    const nextSlide = () => setCarouselIndex((i) => Math.min(totalSlides - 1, i + 1));

    return (
        <>
            <Head title="Pomelo | AI Product Image Variations" />

            <div className="bg-background text-foreground pomelo-font-mono flex h-screen flex-col">
                <style>{PAGE_STYLES}</style>

                {/* ── Header ── */}
                <header className="border-border shrink-0 border-b-2">
                    <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="border-primary grid h-8 w-8 place-items-center border-2 md:h-10 md:w-10">
                                <Sparkles size={14} strokeWidth={2.5} className="md:hidden" />
                                <Sparkles size={18} strokeWidth={2.5} className="hidden md:block" />
                            </div>
                            <div>
                                <h1 className="pomelo-font-display text-sm leading-none font-bold tracking-widest md:text-lg">
                                    POMELO
                                </h1>
                                <p className="text-muted-foreground mt-1 text-xs font-medium tracking-wider md:mt-1.5">
                                    AI PRODUCT IMAGE VARIATION GENERATOR
                                </p>
                            </div>
                        </div>

                        {/* Output count control */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-muted-foreground hidden text-xs tracking-wider md:inline">OUTPUTS</span>
                            <div className="border-border flex items-center border-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => {
                                            setOutputCount(n);
                                            setCarouselIndex(0);
                                        }}
                                        className={`pomelo-font-mono h-8 w-8 cursor-pointer text-xs font-medium transition-all md:h-9 md:w-9 md:text-sm
                                            ${outputCount === n ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Main ── */}
                <main className="flex-1 overflow-hidden">
                    <div className="bg-border grid h-full grid-cols-1 gap-px overflow-hidden lg:grid-cols-[420px_1fr]">

                        {/* ── Left panel: Upload + Prompt ── */}
                        <div className="bg-background flex flex-col overflow-y-auto">

                            {/* Upload zone */}
                            <div className="border-border border-b-2 p-4 md:p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <Upload size={11} strokeWidth={2.5} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-xs font-medium tracking-wider">
                                        PRODUCT IMAGE
                                    </span>
                                    <button
                                        onClick={handleLoadExample}
                                        disabled={!!uploadedImage}
                                        className={`ml-auto flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wider transition-all ${
                                            !uploadedImage
                                                ? 'bg-primary text-primary-foreground hover:opacity-90 cursor-pointer'
                                                : 'bg-background text-muted-foreground/30 cursor-not-allowed'
                                        }`}
                                    >
                                        <FlaskConical size={11} strokeWidth={2.5} />
                                        LOAD EXAMPLE
                                    </button>
                                </div>

                                {uploadedImage ? (
                                    <div className="scale-in relative">
                                        <div className="border-border relative overflow-hidden border-2 p-4">
                                            <img
                                                src={uploadedImage}
                                                alt="Uploaded product"
                                                className="w-full object-contain"
                                                style={{ maxHeight: '280px' }}
                                            />
                                            {/* Subtle grid overlay on corners */}
                                            <div
                                                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                                                style={{
                                                    backgroundImage:
                                                        'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px',
                                                }}
                                            />
                                        </div>

                                        <div className="border-border flex items-center justify-between border-2 border-t-0 px-3 py-2">
                                            <span className="text-muted-foreground max-w-50 truncate text-xs tracking-wide">
                                                {uploadedFileName}
                                            </span>
                                            <button
                                                onClick={handleClearImage}
                                                className="hover:bg-muted flex cursor-pointer items-center gap-1.5 px-2 py-1 text-xs transition-colors"
                                            >
                                                <X size={11} strokeWidth={2.5} className="text-muted-foreground" />
                                                <span className="text-muted-foreground tracking-wide">CLEAR</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-border pomelo-grid-bg flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed py-16 transition-all ${isDragging ? 'drop-zone-active' : 'hover:border-muted-foreground/40'}`}
                                    >
                                        <div
                                            className={`border-border grid h-14 w-14 place-items-center border-2 transition-all ${isDragging ? 'border-primary' : ''}`}
                                        >
                                            <ImageIcon
                                                size={22}
                                                strokeWidth={1.5}
                                                className={`transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p
                                                className={`text-sm font-medium tracking-wider transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
                                            >
                                                {isDragging ? 'DROP TO UPLOAD' : 'DROP IMAGE HERE'}
                                            </p>
                                            <p className="text-muted-foreground/50 mt-1 text-xs tracking-wide">
                                                OR CLICK TO BROWSE · PNG, JPG, WEBP
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/gif"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                            </div>

                            {/* Prompt */}
                            <div className="border-border border-b-2 p-4 md:p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <Zap size={11} strokeWidth={2.5} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-xs font-medium tracking-wider">
                                        STYLE PROMPT
                                    </span>
                                </div>
                                <div className="border-border border-2 focus-within:border-muted-foreground/40 transition-colors">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe the desired variation style, lighting, environment, or mood..."
                                        rows={4}
                                        className="pomelo-font-mono bg-background text-foreground placeholder:text-muted-foreground/30 w-full resize-none p-3 text-xs leading-relaxed tracking-wide outline-none md:text-sm focus:ring-0 border-0"
                                    />
                                    <div className="border-border border-t px-3 py-2">
                                        <span className="text-muted-foreground/40 text-xs tabular-nums tracking-wide">
                                            {prompt.length} CHARS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Generate button */}
                            <div className="p-4 md:p-6">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!canGenerate}
                                    className={`flex w-full cursor-pointer items-center justify-center gap-3 py-3.5 text-sm font-semibold tracking-widest transition-all md:py-4
                                        ${
                                            canGenerate
                                                ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]'
                                                : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={15} className="animate-spin [animation-duration:1.2s]" />
                                            GENERATING VARIATIONS...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={15} strokeWidth={2.5} />
                                            GENERATE {outputCount} VARIATION{outputCount !== 1 ? 'S' : ''}
                                        </>
                                    )}
                                </button>

                                {!uploadedImage && (
                                    <p className="text-muted-foreground/50 mt-3 text-center text-xs tracking-wide">
                                        Upload a product image to begin
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ── Right panel: Output carousel ── */}
                        <div className="bg-background flex flex-col overflow-hidden">

                            {/* Panel label */}
                            <div className="border-border shrink-0 border-b-2 px-4 py-3 md:px-6 md:py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={11} strokeWidth={2.5} className="text-muted-foreground" />
                                        <span className="text-muted-foreground text-xs font-medium tracking-wider">
                                            GENERATED VARIATIONS
                                        </span>
                                    </div>
                                    {(generatedImages.length > 0 || isGenerating) && (
                                        <span className="text-muted-foreground/60 text-xs tabular-nums tracking-wider">
                                            {carouselIndex + 1} / {totalSlides}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Carousel viewport */}
                            <div className="relative flex-1 overflow-hidden">

                                {/* Empty / idle state */}
                                {!isGenerating && generatedImages.length === 0 && (
                                    <div className="pomelo-grid-bg absolute inset-0 flex flex-col items-center justify-center gap-6">
                                        <div className="border-border grid h-20 w-20 place-items-center border-2 opacity-25">
                                            <ImageIcon size={32} strokeWidth={1} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-muted-foreground/40 text-sm font-medium tracking-widest">
                                                AWAITING GENERATION
                                            </p>
                                            <p className="text-muted-foreground/25 mt-1.5 text-xs tracking-wide">
                                                {outputCount} VARIATION{outputCount !== 1 ? 'S' : ''} WILL APPEAR HERE
                                            </p>
                                        </div>
                                        {/* Decorative corner marks */}
                                        <div className="border-muted-foreground/10 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
                                        <div className="border-muted-foreground/10 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
                                        <div className="border-muted-foreground/10 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
                                        <div className="border-muted-foreground/10 absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2" />
                                    </div>
                                )}

                                {/* Generating skeleton */}
                                {isGenerating && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
                                        <div className="w-full max-w-md">
                                            <div className="border-border relative overflow-hidden border-2" style={{ aspectRatio: '4/3' }}>
                                                <div className="from-muted to-muted/40 absolute inset-0 animate-pulse bg-linear-to-br" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                                    <Loader2 size={28} strokeWidth={1.5} className="text-muted-foreground/40 animate-spin [animation-duration:1.2s]" />
                                                    <span className="text-muted-foreground/40 animate-pulse pomelo-font-mono text-xs tracking-widest">
                                                        PROCESSING...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skeleton thumbnails */}
                                        <div className="flex gap-2">
                                            {Array.from({ length: outputCount }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="border-border bg-muted/50 animate-pulse border-2"
                                                    style={{ width: 56, height: 56, animationDelay: `${i * 150}ms` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Generated images carousel */}
                                {!isGenerating && generatedImages.length > 0 && (
                                    <div className="flex h-full flex-col">
                                        {/* Main image */}
                                        <div className="relative flex-1 overflow-hidden p-4 md:p-8">
                                            <div className="output-slot fade-up relative h-full overflow-hidden" key={carouselIndex}>
                                                    <img
                                                        src={displayImages[carouselIndex]?.url}
                                                        alt={displayImages[carouselIndex]?.label}
                                                        className="h-full w-full object-contain"
                                                    />
                                                {/* Label overlay */}
                                                <div className="output-slot-overlay absolute right-2 bottom-2 opacity-0 transition-opacity duration-200">
                                                    <div className="bg-background/90 border-border border px-2 py-1 backdrop-blur-sm">
                                                        <span className="text-muted-foreground text-xs tracking-wider">
                                                            {displayImages[carouselIndex]?.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Thumbnail strip */}
                                        <div className="border-border shrink-0 border-t-2 px-4 py-3 md:px-6 md:py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Prev */}
                                                <button
                                                    onClick={prevSlide}
                                                    disabled={carouselIndex === 0}
                                                    className="border-border bg-background hover:bg-muted grid h-9 w-9 shrink-0 cursor-pointer place-items-center border-2 transition-all disabled:cursor-default disabled:opacity-30"
                                                >
                                                    <ChevronLeft size={14} strokeWidth={2.5} />
                                                </button>

                                                {/* Thumbnails */}
                                                <div className="flex flex-1 justify-center gap-2">
                                                    {displayImages.map((img, i) => (
                                                        <button
                                                            key={img.id}
                                                            onClick={() => setCarouselIndex(i)}
                                                            className={`border-2 cursor-pointer overflow-hidden transition-all shrink-0
                                                                ${i === carouselIndex ? 'border-primary scale-105' : 'border-border hover:border-muted-foreground/50 opacity-60 hover:opacity-80'}`}
                                                            style={{ width: 56, height: 56 }}
                                                            title={img.label}
                                                        >
                                                            <img
                                                                src={img.url}
                                                                alt={img.label}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Next */}
                                                <button
                                                    onClick={nextSlide}
                                                    disabled={carouselIndex === totalSlides - 1}
                                                    className="border-border bg-background hover:bg-muted grid h-9 w-9 shrink-0 cursor-pointer place-items-center border-2 transition-all disabled:cursor-default disabled:opacity-30"
                                                >
                                                    <ChevronRight size={14} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── Footer ── */}
                <footer className="border-border border-t px-4 py-3 md:px-8 md:py-5">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-0">
                        <span className="text-muted-foreground/40 text-xs font-medium tracking-wide">
                            POMELO · PRODUCT IMAGE AI
                        </span>
                        <span className="text-muted-foreground/40 text-xs font-medium tracking-wide md:text-right">
                            UPLOAD · PROMPT · GENERATE
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}

Pomelo.layout = (children: ReactNode | undefined) => <>{children}</>;
