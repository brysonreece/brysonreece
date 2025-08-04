import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import { ReactNode } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';

import { CareerEvent } from '@/types';

import career from '@/json/career.json';

function CareerRecord({ event }: { event: CareerEvent }) {
    return (
        <>
            <img src={event.iconImage} alt={event.employer} className="relative h-16 w-16 flex-none rounded-full bg-white p-2" />
            <div className="-mt-4 flex-auto rounded-md p-4 ring-0 ring-stone-300 ring-inset dark:ring-stone-700">
                <div className="mt-2.5 flex flex-col gap-y-1 sm:min-h-16 sm:flex-row sm:justify-between sm:gap-x-4 sm:gap-y-0">
                    <div className="space-y-1.5 sm:space-y-1">
                        <p className="text-lg leading-5 font-medium text-stone-900 dark:text-stone-100">{event.title}</p>
                        <p className="text-sm font-medium text-stone-500">
                            {event.employer}
                            <span className="sm:hidden"> &middot; {event.location}</span>
                        </p>
                    </div>
                    <div className="space-y-1 text-left sm:text-right">
                        <p className="truncate text-sm font-medium text-stone-500">
                            {event.dates[0]} {event.dates[1] && <> to {event.dates[1]} </>}
                        </p>
                        <p className="hidden text-sm font-medium text-stone-500 sm:block">{event.location}</p>
                    </div>
                </div>

                {event.content && (
                    <div
                        className="prose prose-stone sm:prose-base dark:prose-invert mt-4 max-w-md text-sm leading-6"
                        dangerouslySetInnerHTML={{ __html: event.content }}
                    />
                )}
            </div>
        </>
    );
}

export default function Career() {
    return (
        <>
            <Head title="Career" />

            <Container className="mb-16 max-w-2xl">
                <h1 className="font-display mx-auto mt-12 mb-0 max-w-4xl text-center text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
                    My Career Journey
                </h1>
                <p className="font-display mx-auto mt-8 mb-24 max-w-sm text-center text-2xl tracking-tight text-stone-600 sm:max-w-lg lg:max-w-2xl dark:text-stone-300">
                    An epic tale filled with adventure, dragons, blood, sweat, and tears
                </p>

                <ul role="list" className="space-y-12 px-0">
                    {(career as unknown as CareerEvent[]).reverse().map(function (event, idx) {
                        return (
                            <li key={idx} className="relative flex gap-x-4 pl-4">
                                <div className={clsx(
                                    idx === (career as unknown as CareerEvent[]).length - 1 ? 'display-none' : '-bottom-8',
                                    'absolute top-20 flex w-16 justify-center',
                                )}>
                                    <div className="w-px bg-stone-300 dark:bg-stone-700" />
                                </div>

                                <CareerRecord event={event} />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </>
    );
}

Career.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
