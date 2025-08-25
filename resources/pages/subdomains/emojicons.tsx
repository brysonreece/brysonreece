import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { titleCase } from 'title-case';

import emojisJson from 'unicode-emoji-json/data-by-emoji.json';
import emojiComponentsJson from 'unicode-emoji-json/data-emoji-components.json';

type EmojiDetails = {
    name: string;
    slug: string;
    group: string;
    emoji_version: string;
    unicode_version: string;
    skin_tone_support: boolean;
    skin_tone_support_unicode_version?: string;
};

type SkinTone = 'light' | 'medium_light' | 'medium' | 'medium_dark' | 'dark';

const emojis = emojisJson as Record<string, EmojiDetails>;
const emojiComponents = emojiComponentsJson as Record<string, string>;
const buttonStyles = "bg-orange-600! hover:bg-orange-700! text-white! rounded-full! px-3.5! py-2.5! text-sm! font-semibold! shadow-sm! focus-visible:outline-none! focus-visible:ring-2! focus-visible:ring-orange-500! focus-visible:ring-offset-2!";

export default function Emojicon() {
    // Force light mode for this page
    const { appearance, updateAppearance } = useAppearance();
    useEffect(() => updateAppearance('light'), [appearance, updateAppearance]);

    const [activeEmoji, setActiveEmoji] = useState('');
    const [previewEmoji, setPreviewEmoji] = useState('');
    const [activeSkinTone, setActiveSkinTone] = useState('');

    const skinToneSupported = useMemo(() => activeEmoji ? emojis[activeEmoji].skin_tone_support : false, [activeEmoji]);
    const currentYear = useMemo(() => (new Date).getFullYear(), []);
    const groupedEmojis: Record<string, [string, EmojiDetails][]> = useMemo(() => Object.entries(emojis).reduce(
        (groups, [char, details]) => {
            if (!groups[details.group]) groups[details.group] = [];
            groups[details.group].push([char, details]);
            return groups;
        },
        {} as Record<string, [string, EmojiDetails][]>
    ), []);

    useEffect(() => {
        document.querySelector('link[rel="icon"]')?.setAttribute(
            'href',
            `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>${activeEmoji || '👋'}</text></svg>`
        );
    }, [activeEmoji]);

    useEffect(() => {
        setPreviewEmoji(
            skinToneSupported
            ? (activeSkinTone
                ? (activeEmoji + emojiComponents[`${activeSkinTone}_skin_tone`])
                : activeEmoji)
            : activeEmoji
        );
    }, [activeSkinTone, activeEmoji, skinToneSupported]);

    useEffect(() => console.log(previewEmoji), [previewEmoji]);

    return (
        <div className="flex h-screen min-w-sm flex-col">
            <div className="sticky top-0 flex-none py-2 px-4 bg-stone-100 border-b border-stone-300 text-stone-500">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl space-x-3">
                        <span>{activeEmoji || '🎨'}</span>
                        <span className="font-bold text-orange-600">emojicons</span>
                    </h1>
                    <Button asChild>
                        <a href="https://css-tricks.com/emoji-as-a-favicon/" target="_blank" rel="noopener" className={buttonStyles}>
                            Learn More 🔎
                        </a>
                    </Button>
                </div>
            </div>
            <div className="sm:py-8 lg:py-12 transform origin-top duration-1000">
                <div className="relative isolate">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mx-auto flex max-w-2xl flex-col-reverse gap-8 bg-white/75 px-6 py-8 shadow-lg ring-1 ring-gray-900/5 sm:rounded-3xl sm:py-8 sm:px-12 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center dark:bg-white/3 dark:shadow-none dark:ring-white/10">
                            <div className="flex-grow">
                                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl dark:text-white">
                                    {activeEmoji ? titleCase(emojis[activeEmoji].name) : 'Welcome!'}
                                </h2>
                                <p className="mt-6 text-lg/8 text-pretty text-gray-600 dark:text-gray-400">
                                    {activeEmoji
                                        ? "Copy the code below to embed this emoji into your website as the default favicon."
                                        : "Emojicons are a fun way to style your website's favicon using your favorite emojis. Select one below to get started."
                                    }
                                </p>
                                {activeEmoji && (
                                    <div className="mt-12 flex flex-col gap-4">
                                        <div className="w-full">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Embedded Link</h3>
                                            <pre className="mt-1 w-full whitespace-pre-wrap rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 overflow-auto">
                                                {`<link
    rel="icon"
    href="data:image/svg+xml,
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <text y='0.9em' font-size='90'>${previewEmoji}</text>
        </svg>
    "
/>`}
                                            </pre>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Hosted Link</h3>
                                            <pre className="mt-1 w-full whitespace-pre-wrap rounded bg-gray-100 p-2 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200 overflow-auto">
                                                {`<link rel="icon" href="https://emojicons.dev/${previewEmoji}" />`}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {activeEmoji && previewEmoji && (
                                <div className="flex-shrink-0 flex flex-col items-center justify-center">
                                    <div className="size-96 aspect-square inline-flex items-center justify-center">
                                        <span className="text-[16rem] leading-0 antialiased">
                                            {previewEmoji}
                                        </span>
                                    </div>

                                    {activeEmoji && skinToneSupported && (
                                        <div className="mt-6 flex items-center gap-2">
                                            <button
                                                className={cn("h-8 w-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2", {
                                                    'border-orange-500': activeSkinTone === '',
                                                    'border-transparent': activeSkinTone !== '',
                                                })}
                                                onClick={() => setActiveSkinTone('')}
                                                aria-label="default"
                                            >
                                                <span className="text-sm">🚫</span>
                                            </button>
                                            {['light', 'medium_light', 'medium', 'medium_dark', 'dark'].map((tone) => (
                                                <button
                                                    key={tone}
                                                    className={cn("h-8 w-8 border-2 focus:outline-none focus:ring-2 focus:ring-offset-[-2px] text-2xl leading-0", {
                                                        'border-orange-500': activeSkinTone === tone,
                                                        'border-transparent': activeSkinTone !== tone,
                                                    })}
                                                    onClick={() => setActiveSkinTone(tone as SkinTone)}
                                                    aria-label={tone.replace('_', ' ')}
                                                >
                                                    {['🏻', '🏼', '🏽', '🏾', '🏿'][['light', 'medium_light', 'medium', 'medium_dark', 'dark'].indexOf(tone)]}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div aria-hidden="true" className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
                        <div style={{clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'}} className="aspect-1318/752 w-329.5 flex-none bg-linear-to-r from-[#9fd6fc] to-[#8680fd] opacity-50 dark:from-[#80caff] dark:to-[#4f46e5] dark:opacity-20"></div>
                    </div>
                </div>
            </div>
            <div className="z-0 flex-grow p-4 space-y-16 bg-white border-t border-stone-300 overflow-y-scroll">
                {Object.entries(groupedEmojis).map(([name, groupEmojis]) => (
                    <div key={name} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                        <h2 className="text-lg font-semibold mb-4">{name}</h2>
                        <div className="space-x-2 space-y-2">
                            {Object.values(groupEmojis).map(([emoji, details]) => {
                                return (
                                    <button
                                        key={emoji}
                                        className={cn("text-3xl p-2 bg-white rounded hover:bg-orange-100 focus:outline-none focus:ring-3 focus:ring-orange-500", {
                                            'bg-orange-100 ring-3 ring-orange-500': activeEmoji === emoji,
                                        })}
                                        onClick={() => setActiveEmoji(emoji)}
                                        title={details.name}
                                    >
                                        {emoji}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="sticky bottom-0 max-sm:hidden flex-none py-2 px-2.5 bg-stone-100 border-t border-stone-300 text-stone-500">
                <div className="flex items-center justify-between text-sm leading-4 font-display">
                    <p>Crafted with care.</p>
                    <a href="https://bryson.cc" target="_blank" rel="noopener">
                        <p>Bryson Reece © {currentYear}</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

Emojicon.layout = (children: ReactNode | undefined) => <>{children}</>;
