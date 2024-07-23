import { cn } from "@/lib/util";
import Image, { StaticImageData } from "next/image";
import { Fragment, useMemo } from "react";

import flywheelLogo from "@/public/images/logos/flywheel.png";
import meetupLogo from "@/public/images/logos/meetup.png";
import ouLogo from "@/public/images/logos/ou.png";
import tankvaultLogo from "@/public/images/logos/tankvault.png";
import wellcaddieLogo from "@/public/images/logos/wellcaddie.png";
import whytespyderLogo from "@/public/images/logos/whytespyder.png";
import wunderiteLogo from "@/public/images/logos/wunderite.png";

function CareerRecord({ event }: { event: CareerEvent }) {
    const logo = useMemo<StaticImageData | null>(
        () => {
            switch (event.employer) {
                case 'Flywheel Digital':
                    return flywheelLogo;
                case 'The University of Oklahoma':
                    return ouLogo;
                case 'TankVault':
                    return tankvaultLogo;
                case 'WellCaddie':
                    return wellcaddieLogo;
                case 'WhyteSpyder':
                    return whytespyderLogo;
                case 'Wunderite':
                    return wunderiteLogo;
                default:
                    return null;
            }
        },
        [event.employer],
    );

    return (
        <>
            {logo ? (
                <Image
                    src={logo}
                    alt={event.employer}
                    className="relative h-12 w-12 m-2 p-1.5 flex-none rounded-lg bg-white"
                />
            ): (
                <div className="relative h-16 w-16 p-6 flex-none rounded-full bg-transparent">
                    <div className="h-full w-full rounded-full ring-1 ring-stone-300 dark:ring-stone-700" />
                </div>
            )}

            <div className="flex-auto rounded-md -mt-4 p-4 ring-0 ring-inset ring-stone-300 dark:ring-stone-700">
                <div className="sm:min-h-16 flex flex-col sm:flex-row mt-2.5 sm:justify-between gap-y-1 sm:gap-y-0 sm:gap-x-4">
                    <div className="space-y-1.5 sm:space-y-1">
                        <p className="text-lg font-medium leading-5 text-stone-900 dark:text-stone-100">{event.title}</p>
                        <p className="text-sm font-medium text-stone-500">
                            {event.employer}
                            <span className="sm:hidden"> &middot; {event.location}</span>
                        </p>
                    </div>
                    <div className="text-left sm:text-right space-y-1">
                        <p className="text-sm font-medium truncate text-stone-500">{event.dates[0]} {event.dates[1] && (<> to {event.dates[1]} </>)}</p>
                        <p className="hidden sm:block text-sm font-medium text-stone-500">{event.location}</p>
                    </div>
                </div>

                {event.description && (
                    <div
                        className="mt-4 text-sm leading-6 prose prose-stone sm:prose-base dark:prose-invert max-w-md"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                )}
            </div>
        </>
    );
}

function CommunityRecord({ event }: { event: CommunityEvent }) {
    const logo = useMemo<StaticImageData | null>(
        () => {
            switch (event.host) {
                case 'The University of Oklahoma, Edge Makerspace':
                case 'The University of Oklahoma, Homebrew Website Club':
                    return ouLogo;
                case 'Techlahoma, FreeCodeCamp OKC':
                case 'Techlahoma, OKC VR':
                case 'Norman AR/VR':
                    return meetupLogo;
                default:
                    return null;
            }
        },
        [event.host],
    );

    return (
        <>
            {logo ? (
                <Image
                    src={logo}
                    alt={event.host}
                    className="relative h-12 w-12 m-2 p-1.5 flex-none rounded-lg bg-white"
                />
            ): (
                <div className="relative h-16 w-16 p-6 flex-none rounded-full bg-transparent">
                    <div className="h-full w-full rounded-full ring-1 ring-stone-300 dark:ring-stone-700" />
                </div>
            )}

            <div className="flex-auto rounded-md -mt-4 p-4 ring-0 ring-inset ring-stone-300 dark:ring-stone-700">
                <div className="sm:min-h-16 flex flex-col sm:flex-row mt-2.5 sm:justify-between gap-y-1 sm:gap-y-0 sm:gap-x-4">
                    <div className="space-y-1.5 sm:space-y-1">
                        <p className="text-lg font-medium leading-5 text-stone-900 dark:text-stone-100">{event.title}</p>
                        <p className="text-sm font-medium text-stone-500">
                            {event.host}
                            <span className="sm:hidden"> &middot; {event.location}</span>
                        </p>
                    </div>
                    <div className="text-left sm:text-right space-y-1">
                        <p className="text-sm font-medium truncate text-stone-500">{event.dates[0]} {event.dates[1] && (<> to {event.dates[1]} </>)}</p>
                        <p className="hidden sm:block text-sm font-medium text-stone-500">{event.location}</p>
                    </div>
                </div>

                {event.description && (
                    <div
                        className="mt-4 text-sm leading-6 prose prose-stone sm:prose-base dark:prose-invert max-w-md"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                )}
            </div>
        </>
    );
}

function ProjectRecord({ event }: { event: ProjectEvent }) {
    return (
        <>
            <div className="relative h-16 w-16 p-6 flex-none rounded-full bg-transparent">
                <div className="h-full w-full rounded-full ring-1 ring-stone-300 dark:ring-stone-700" />
            </div>
            <div className="flex-auto rounded-md -mt-4 p-4 ring-0 ring-inset ring-stone-300 dark:ring-stone-700">
                <div className="sm:min-h-16 flex flex-col sm:flex-row mt-2.5 sm:justify-between gap-y-1 sm:gap-y-0 sm:gap-x-4">
                    <div className="space-y-1.5 sm:space-y-1">
                        <p className="text-lg font-medium leading-5 text-stone-900 dark:text-stone-100">{event.title}</p>

                        {event.description && (
                            <p className="text-sm font-medium text-stone-500">{event.description}</p>
                        )}
                    </div>
                    <div className="text-left sm:text-right space-y-4 sm:space-y-1">
                        <p className="mt-4 sm:mt-0 text-sm font-medium truncate text-stone-500">{event.dates[0]} {event.dates[1] && (<> to {event.dates[1]} </>)}</p>

                        {event.resources.length > 0 && (
                            <ul className="list-none space-y-1">
                                {event.resources.map((resource: UrlResource, idx: number) => (
                                    <li key={idx}>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium truncate text-stone-500">
                                            {resource.label} &rarr;
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export function EventList({ events }: { events: LifeEvent[] }) {
    return (
        <ul role="list" className="space-y-12 px-0">
            {events.map(function (event: LifeEvent, idx: number) {
                let recordComponent = undefined;

                switch (true) {
                    case ('employer' in event):
                        recordComponent = (<CareerRecord event={event as CareerEvent} />);
                        break;
                    case ('host' in event):
                        recordComponent = (<CommunityRecord event={event as CommunityEvent} />);
                        break;
                    default: // otherwise, assume it's a project
                        recordComponent = (<ProjectRecord event={event as ProjectEvent} />);
                        break;
                }

                return (
                    <li key={idx} className="relative flex gap-x-4 pl-4">
                        <div
                            className={cn(
                                idx === events.length - 1 ? 'display-none' : '-bottom-8',
                                'absolute top-20 flex w-16 justify-center'
                            )}
                        >
                            <div className="w-px bg-stone-300 dark:bg-stone-700" />
                        </div>

                        {recordComponent}
                    </li>
                );
            })}
        </ul>
    );
}
