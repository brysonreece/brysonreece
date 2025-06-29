/* eslint-disable @typescript-eslint/no-explicit-any */

import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';

import { ProjectEvent } from '@/types';

interface EventListProps {
    title: string;
    heading: string;
    subtitle: string;
    events: ProjectEvent[];
}

function ProjectRecord({ event }: { event: ProjectEvent }) {
    const [resourceLinks, setResourceLinks] = useState<[string, string][]>([]);

    useEffect(() => {
        setResourceLinks(Object.entries(event.resources));
    }, [event]);

    return (
        <>
            <div className={clsx(
                'p-4 rounded-lg sm:rounded-xl',
                'bg-stone-100 hover:bg-stone-200/25 dark:bg-stone-900 dark:hover:bg-stone-950/10',
                'hover:shadow-lg shadow-stone-300 dark:shadow-stone-950',
                'ring ring-stone-200 hover:ring-stone-300 dark:ring-stone-800',
                'group transition-[box-shadow,background-color] duration-500 ease-in-out',
            )}>
                <div className="flex flex-col gap-y-8 sm:min-h-16 text-sm font-medium text-stone-500">
                    <div className="w-full space-y-1.5 sm:space-y-2.5">
                        <p className="truncate text-lg leading-5 text-stone-900 dark:text-stone-100">{event.title}</p>

                        <p className="truncate sm:mt-0">
                            {event.dates[0]} {event.dates[1] && <> to {event.dates[1]} </>}
                        </p>

                        {event.description && <p>{event.description}</p>}
                    </div>

                    {resourceLinks.length > 0 && (
                        <div className="space-y-4 text-left sm:space-y-1">
                            <ul className="list-none flex flex-wrap gap-x-6 -mb-1.5">
                                {resourceLinks.map(([key, value]) => (
                                    <li key={key}>
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(
                                                'text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300',
                                                'transition-colors duration-500 ease-in-out',
                                                'inline-block rounded-lg text-sm font-medium active:text-stone-900 dark:active:text-stone-400 leading-8',
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

export default function EventList({ title, heading, subtitle, events }: EventListProps) {
    return (
        <>
            <Head title={title} />

            <Container className="mb-16 max-w-6xl">
                <h1 className="font-display mx-auto mt-12 mb-0 max-w-4xl text-center text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
                    {heading}
                </h1>
                <p className="font-display mx-auto mt-8 mb-24 max-w-sm text-center text-2xl tracking-tight text-stone-600 sm:max-w-lg lg:max-w-2xl dark:text-stone-300">
                    {subtitle}
                </p>

                <ul role="list" className="columns-1 md:columns-2 lg:columns-3 space-y-6 gap-6">
                    {events.map((event: any, idx: number) => (
                        <li key={idx} className="break-inside-avoid-column">
                            <ProjectRecord key={idx} event={event} />
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    );
}

EventList.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
