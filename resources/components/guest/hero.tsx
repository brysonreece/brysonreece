import { CloudDownloadIcon } from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { GazeTracker } from '@/components/gaze-tracker';
import { useCallback, useEffect, useRef, useState } from 'react';

type HeroProps = {
    enableMouseAnimation?: boolean;
    containerRef?: React.RefObject<HTMLDivElement | null>;
};

export function Hero({ enableMouseAnimation = false, containerRef: externalContainerRef }: HeroProps) {
    const [isCosmoMode, setIsCosmoMode] = useState(false);
    const [displayedName, setDisplayedName] = useState('Bryson Reece');
    const [displayedSubtitle, setDisplayedSubtitle] = useState('a passionate maker with a specialty in developing enterprise platforms that scale');
    const [isTyping, setIsTyping] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const animationStartNameRef = useRef('Bryson Reece');
    const internalContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = externalContainerRef || internalContainerRef;

    function transformElement(element: HTMLElement, mouseX: number, mouseY: number) {
        const box = element.getBoundingClientRect();

        const calc = (val: number) => Math.max(-5, Math.min(5, val));

        const relativeMouseX = mouseX - (box.x + box.width / 2);
        const relativeMouseY = mouseY - (box.y + box.height / 2);

        element.style.transform = `
            translate(${calc(relativeMouseX)}px, ${calc(relativeMouseY)}px)
            rotateX(${calc(-relativeMouseY)}deg) rotateY(${calc(relativeMouseX)}deg)
        `;
    }

    const toggleCosmoMode = useCallback(() => {
        animationStartNameRef.current = displayedName;
        setIsCosmoMode((prev) => !prev);
        setIsTyping(true);
    }, [displayedName]);

    useEffect(() => {
        if (!enableMouseAnimation) return;

        const app = document.getElementById('app')!;
        const element = document.getElementById('avatar')!;

        const transform = (e: MouseEvent) => {
            window.requestAnimationFrame(function () {
                transformElement(element, e.clientX, e.clientY);
            });
        };

        const reset = () => {
            window.requestAnimationFrame(function () {
                element.style.transform = "translate(0, 0) rotateX(0) rotateY(0)";
            });
        };

        app.addEventListener("mousemove", transform);
        app.addEventListener("mouseleave", reset);

        return () => {
            app.removeEventListener("mousemove", transform);
            app.removeEventListener("mouseleave", reset);
        };
    }, [enableMouseAnimation]);

    // Keyboard listener for 'c' and 'b' keys
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === 'c' || e.key === 'C') {
                if (!isCosmoMode) {
                    animationStartNameRef.current = displayedName;
                    setIsCosmoMode(true);
                    setIsTyping(true);
                }
            } else if (e.key === 'b' || e.key === 'B') {
                if (isCosmoMode) {
                    animationStartNameRef.current = displayedName;
                    setIsCosmoMode(false);
                    setIsTyping(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isCosmoMode, displayedName]);

    // Typing animation effect
    useEffect(() => {
        if (!isTyping) return;

        const targetName = isCosmoMode ? 'Cosmo Chezmoi' : 'Bryson Reece';
        const startName = animationStartNameRef.current;
        let phase: 'backspace' | 'type' = startName.length > 0 ? 'backspace' : 'type';
        let index = startName.length;

        const typingInterval = setInterval(() => {
            if (phase === 'backspace') {
                if (index > 0) {
                    index--;
                    setDisplayedName(startName.slice(0, index));
                } else {
                    // Switch to typing phase
                    phase = 'type';
                    index = 0;
                }
            } else {
                // Typing phase
                if (index < targetName.length) {
                    index++;
                    setDisplayedName(targetName.slice(0, index));
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                }
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [isTyping, isCosmoMode]);

    // Update subtitle after it has fully faded out
    useEffect(() => {
        if (!isTyping) return;

        // Wait 300ms (full fade-out duration) before changing the text
        const timeout = setTimeout(() => {
            const targetSubtitle = isCosmoMode
                ? "the goodest boy with a nose for opportunity and a habit of herding better team outcomes"
                : "a passionate maker with a specialty in developing enterprise platforms that scale";
            setDisplayedSubtitle(targetSubtitle);
        }, 300);

        return () => clearTimeout(timeout);
    }, [isTyping, isCosmoMode]);

    // Handle button visibility with delayed fade-in
    useEffect(() => {
        setShowButtons(!isTyping);
    }, [isTyping]);

    return (
        <div className="text-center">
            <div className="relative mx-auto size-64">
                <div
                    onClick={toggleCosmoMode}
                    className={`absolute inset-0 size-64 cursor-pointer transition-opacity duration-250 ${
                        isCosmoMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <GazeTracker
                        containerRef={containerRef}
                        className="size-64"
                        basePath="/storage/img/gaze/cosmo"
                        pMin={-10}
                        pMax={10}
                        stepSize={5}
                        imgSize={256}
                    />
                </div>
                <Avatar
                    id="avatar"
                    onClick={toggleCosmoMode}
                    className={`absolute inset-0 size-64 border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-80 transform-3d cursor-pointer transition-opacity duration-500 ${
                        isCosmoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                >
                    <AvatarImage
                        className="h-full w-full rounded-full"
                        src="/storage/img/me.webp"
                        alt="Bryson Reece"
                        fetchPriority="high"
                    />
                </Avatar>
            </div>

            <h1 className="font-display mx-auto mt-12 max-w-4xl text-5xl font-medium tracking-tight text-stone-900 sm:text-7xl dark:text-stone-400">
                Hey there, <br className="max-sm:hidden" />
                I'm <br className="sm:hidden" />
                <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                        viewBox="0 0 418 42"
                        className={`absolute top-2/3 left-0 sm:mt-1 h-[0.58em] w-full fill-stone-300/70 dark:fill-stone-700/70 transition-opacity duration-300 ${
                            isTyping ? 'opacity-0' : 'opacity-100'
                        }`}
                        preserveAspectRatio="none"
                    >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                    <span className="relative bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                        {displayedName}
                    </span>
                </span>
            </h1>

            <p
                className={`mx-auto mt-12 max-w-md text-lg font-medium tracking-tight text-stone-700 dark:text-stone-400 transition-opacity duration-300 ${
                    isTyping ? 'opacity-0' : 'opacity-100 delay-300'
                }`}
            >
                {displayedSubtitle}
            </p>

            <div
                className={`mt-12 flex items-center justify-center gap-x-6 transition-opacity duration-300 ${
                    showButtons ? 'opacity-100 delay-600' : 'opacity-0'
                }`}
            >
                <a
                    href={isCosmoMode ? "/storage/cosmo-chezmoi-resume.pdf" : "/storage/bryson-reece-resume.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-stone-700 px-2 py-1 text-sm font-medium text-stone-700 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-stone-500 dark:text-stone-400 dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                >
                    <CloudDownloadIcon className="mr-1 h-4 w-4" />
                    <span>Resume</span>
                </a>
                <a
                    href={route('guest.about')}
                    className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-stone-700 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-stone-500 dark:text-stone-400 dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                >
                    <span>Learn more &rarr;</span>
                </a>
            </div>
        </div>
    );
}
