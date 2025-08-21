import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';

import { ProjectEvent } from '@/types';

import projects from '@/json/projects.json';

function ProjectRecord({ event }: { event: ProjectEvent }) {
    const [resourceLinks, setResourceLinks] = useState<[string, string][]>([]);

    useEffect(() => {
        setResourceLinks(Object.entries(event.resources));
    }, [event]);

    return (
        <>
            <div
                className={clsx(
                    'h-full rounded-lg p-4 sm:rounded-xl',
                    'bg-stone-100 hover:bg-stone-200/25 dark:bg-stone-900 dark:hover:bg-stone-950/10',
                    'shadow-stone-300 hover:shadow-lg dark:shadow-stone-950',
                    'ring ring-stone-200 hover:ring-stone-300 dark:ring-stone-800',
                    'group transition-[box-shadow,background-color] duration-500 ease-in-out',
                )}
            >
                <div className="flex h-full flex-col justify-between gap-y-8 text-sm font-medium text-stone-500 sm:min-h-16">
                    <div className="w-full space-y-1.5 sm:space-y-2.5">
                        <p className="truncate text-lg leading-5 text-stone-900 dark:text-stone-100">{event.title}</p>

                        <p className="truncate sm:mt-0">
                            {event.dates[0]} {event.dates[1] && <> to {event.dates[1]} </>}
                        </p>

                        {event.description && <p>{event.description}</p>}
                    </div>

                    {resourceLinks.length > 0 && (
                        <div className="space-y-4 text-left sm:space-y-1">
                            <ul className="-mb-1.5 flex list-none flex-wrap gap-x-6">
                                {resourceLinks.map(([key, value]) => (
                                    <li key={key}>
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(
                                                'text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300',
                                                'transition-colors duration-500 ease-in-out',
                                                'inline-block rounded-lg text-sm leading-8 font-medium active:text-stone-900 dark:active:text-stone-400',
                                            )}
                                        >
                                            {key}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default function Projects() {
    const { featured, completed, limbo } = projects as unknown as Record<'featured' | 'completed' | 'limbo', ProjectEvent[]>;

    return (
        <>
            <Head title="Projects" />

            <Container className="mb-16 max-w-6xl">
                <h1 className="font-display mx-auto mt-12 mb-0 max-w-4xl text-center text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
                    Projects & Prototypes
                </h1>
                <p className="font-display mx-auto mt-8 mb-24 max-w-sm text-center text-2xl tracking-tight text-stone-600 sm:max-w-lg lg:max-w-2xl dark:text-stone-300">
                    The "5 to 9s" after the "9 to 5"
                </p>

                <label className="mb-4 block text-sm font-medium text-stone-700 dark:text-stone-300">Featured</label>
                <ul role="list" className="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((event, idx) => (
                        <li key={idx} className="h-full break-inside-avoid-column">
                            <ProjectRecord key={idx} event={event} />
                        </li>
                    ))}
                </ul>

                <label className="mb-4 block text-sm font-medium text-stone-700 dark:text-stone-300">Archive</label>
                <ul role="list" className="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {completed.map((event, idx) => (
                        <li key={idx} className="h-full break-inside-avoid-column">
                            <ProjectRecord key={idx} event={event} />
                        </li>
                    ))}
                </ul>

                <label className="mb-4 block text-sm font-medium text-stone-700 dark:text-stone-300">Incomplete</label>
                <ul role="list" className="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {limbo.map((event, idx) => (
                        <li key={idx} className="h-full break-inside-avoid-column">
                            <ProjectRecord key={idx} event={event} />
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    );
}

Projects.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
