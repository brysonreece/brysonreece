import { Container } from '@/components/ui/container';
import { CloudDownloadIcon } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';

export function Hero() {
    return (
        <Container className="pt-12 pb-16 text-center sm:pt-24 xl:pt-48">

            <Avatar
                className="mx-auto size-72 border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
            >
                <AvatarImage
                    className="h-full w-full rounded-full"
                    src="https://avatars.githubusercontent.com/u/4043157?v=4"
                    alt="Bryson Reece"
                />
            </Avatar>

            <h1 className="font-display mx-auto mt-12 max-w-4xl text-5xl font-medium tracking-tight text-stone-900 sm:text-7xl dark:text-stone-400">
                Hey there, <br />
                I'm{' '}
                <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                        viewBox="0 0 418 42"
                        className="absolute top-2/3 left-0 mt-1 h-[0.58em] w-full fill-stone-300/70 dark:fill-stone-700/70"
                        preserveAspectRatio="none"
                    >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                    <span className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                        Bryson Reece
                    </span>
                </span>
            </h1>

            <p className="mx-auto mt-12 max-w-md text-lg font-medium tracking-tight text-stone-700 dark:text-stone-400">
                a passionate maker with a specialty in developing enterprise platforms that scale
            </p>

            <a
                href="/storage/bryson-reece-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center rounded-md border border-stone-700 px-2 py-1 text-sm font-medium text-stone-700 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-stone-500 dark:text-stone-400 dark:hover:bg-transparent dark:hover:text-blue-500 dark:hover:border-blue-500"
            >
                <CloudDownloadIcon className="mr-1 h-4 w-4" />
                <span>Resume</span>
            </a>

            {/*
              <ArrowDownIcon className="w-5 h-5 mt-24 mx-auto animate-bounce stroke-2 text-stone-900 dark:text-stone-500" style={{
                  animation: "bounce 4s infinite",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 0.6)",
              }} />
            */}
        </Container>
    );
}
