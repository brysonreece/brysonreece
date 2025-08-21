import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import {
    BlueskyIcon,
    CreativeCommonsIcon,
    FacebookIcon,
    GitHubIcon,
    HackadayIcon,
    MeetupIcon,
    PaperAirplaneIcon,
    PrintablesIcon,
    SpotifyIcon,
    XIcon,
} from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const links = [
    {
        label: 'Website',
        href: 'https://bryson.cc',
        icon: CreativeCommonsIcon,
    },
    {
        label: 'Email Me',
        href: 'mailto:hey@bryson.cc',
        icon: PaperAirplaneIcon,
    },
    {
        href: 'https://github.com/brysonreece',
        icon: GitHubIcon,
        label: 'GitHub',
    },
    {
        href: 'https://x.com/brysonio',
        icon: XIcon,
        label: 'Tweets',
    },
    {
        label: 'Bluesky',
        href: 'https://bsky.app/profile/bryson.cc',
        icon: BlueskyIcon,
    },
    {
        href: 'https://facebook.com/brysonreece',
        icon: FacebookIcon,
        label: 'Facebook',
    },
    {
        label: 'Spotify',
        href: 'https://open.spotify.com/user/brysonreece',
        icon: SpotifyIcon,
    },
    {
        label: 'Meetup',
        href: 'https://www.meetup.com/members/226400238',
        icon: MeetupIcon,
    },
    {
        label: 'Hackaday.io',
        href: 'https://hackaday.io/bryson',
        icon: HackadayIcon,
    },
    {
        label: 'Printables',
        href: 'https://www.printables.com/@brysonreece_1070274',
        icon: PrintablesIcon,
    },
];

export default function Links() {
    return (
        <>
            <Head title="Links" />

            <div className="flex h-full min-h-screen min-w-sm flex-col">
                <div className="mx-auto my-8 w-full max-w-xs px-4 sm:my-16">
                    <Avatar className="mx-auto size-36 border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-800">
                        <AvatarImage
                            className="h-full w-full rounded-full"
                            src="/storage/img/me.png"
                            alt="Bryson Reece"
                            fetchPriority="high"
                        />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            BR
                        </AvatarFallback>
                    </Avatar>
                    <div className="my-8">
                        <h1 className="mx-auto mb-4 w-fit font-mono text-2xl">Bryson Reece</h1>
                        <div className="mx-auto w-full max-w-4/5 border-b-1 border-stone-300 dark:border-stone-700"></div>
                    </div>
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li
                                key={link.href}
                                className={cn(
                                    'rounded-lg sm:rounded-xl',
                                    'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300',
                                    'bg-stone-100 sm:hover:bg-stone-200/25 dark:bg-stone-900 sm:dark:hover:bg-stone-700/10',
                                    'shadow-stone-300 sm:hover:shadow-lg dark:shadow-stone-950',
                                    'sm:hover:ring sm:hover:ring-stone-300 dark:sm:hover:ring-stone-950/10',
                                    'group transition-[box-shadow,background-color,color] duration-0 ease-in-out sm:duration-500',
                                )}
                            >
                                <a
                                    className="flex items-center justify-center space-x-4 rounded-lg p-4 text-center"
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <link.icon className="-ml-5 size-5 fill-current" />

                                    <span>{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

Links.layout = (children: ReactNode | undefined) => <>{children}</>;
