import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { BlueskyIcon, CreativeCommonsIcon, FacebookIcon, GitHubIcon, HackadayIcon, MeetupIcon, PaperAirplaneIcon, PrintablesIcon, SpotifyIcon, XIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

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
                <div className="mx-auto my-8 sm:my-16 w-full max-w-xs px-4">
                    <Avatar
                        className="mx-auto size-36 border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
                    >
                        <AvatarImage
                            className="h-full w-full rounded-full"
                            src="https://avatars.githubusercontent.com/u/4043157?v=4"
                            alt="Bryson Reece"
                        />
                    </Avatar>
                    <div className="my-8">
                        <h1 className="mx-auto mb-4 text-2xl font-mono w-fit">Bryson Reece</h1>
                        <div className="w-full max-w-4/5 mx-auto border-b-1 border-stone-300 dark:border-stone-700"></div>
                    </div>
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li key={link.href} className={cn(
                                'rounded-lg sm:rounded-xl',
                                'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300',
                                'bg-stone-100 sm:hover:bg-stone-200/25 dark:bg-stone-900 sm:dark:hover:bg-stone-700/10',
                                'sm:hover:shadow-lg shadow-stone-300 dark:shadow-stone-950',
                                'sm:hover:ring sm:hover:ring-stone-300 dark:sm:hover:ring-stone-950/10',
                                'group transition-[box-shadow,background-color,color] duration-0 ease-in-out sm:duration-500',
                            )}>
                                <a className="flex items-center justify-center space-x-4 p-4 rounded-lg text-center" href={link.href} target="_blank" rel="noopener noreferrer">
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
