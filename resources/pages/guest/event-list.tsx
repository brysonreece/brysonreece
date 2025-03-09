import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';

import { Container } from '@/components/ui/container';

import { CareerEvent, CommunityEvent, ProjectEvent } from '@/types';
import { GuestLayout } from '@/layouts/guest-layout';

interface EventListProps {
  title: string;
  heading: string;
  subtitle: string;
  events: any[];
}

function CareerRecord({ event }: { event: CareerEvent }) {
  return (
    <>
      <img
        src={event.logoUrl}
        alt={event.employer}
        className="relative h-16 w-16 p-2 flex-none rounded-full bg-white"
      />
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

        {event.content && (
          <div
            className="mt-4 text-sm leading-6 prose prose-stone sm:prose-base dark:prose-invert max-w-md"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}
      </div>
    </>
  );
}

function CommunityRecord({ event }: { event: CommunityEvent }) {
  return (
    <>
      <img
        src={event.logoUrl}
        alt={event.host}
        className="relative h-16 w-16 p-2 flex-none rounded-full bg-white"
      />
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

        {event.content && (
          <div
            className="mt-4 text-sm leading-6 prose prose-stone sm:prose-base dark:prose-invert max-w-md"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}
      </div>
    </>
  );
}

function ProjectRecord({ event }: { event: ProjectEvent }) {
  const [resourceLinks, setResourceLinks] = useState<[string, string][]>([]);

  useEffect(() => {
    setResourceLinks(Object.entries(event.resources));
  }, [event]);

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

            {resourceLinks.length > 0 && (
              <ul className="list-none space-y-1">
                {resourceLinks.map(([key, value]) => (
                  <li key={key}>
                    <a href={value} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium truncate text-stone-500">
                      {key} &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {event.content && (
          <div
            className="mt-4 text-sm leading-6 prose prose-stone sm:prose-base dark:prose-invert max-w-md"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}
      </div>
    </>
  );
}

export default function EventList({ title, heading, subtitle, events }: EventListProps) {
  return (
    <GuestLayout title={title}>
      <Container className="mb-16 max-w-2xl">
        <h1 className="mx-auto mt-12 mb-0 text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-6xl">
          {heading}
        </h1>
        <p className="mx-auto mt-8 mb-24 text-center max-w-sm sm:max-w-lg lg:max-w-2xl font-display tracking-tight text-stone-600 dark:text-stone-300 text-2xl">
          {subtitle}
        </p>

        <ul role="list" className="space-y-12 px-0">
          {events.map(function (event: any, idx: number) {
            let recordComponent = (<Fragment key={idx} />);

            switch (event.type as string) {
              case 'career':
                recordComponent = (<CareerRecord key={idx} event={event as CareerEvent} />);
                break;
              case 'community':
                recordComponent = (<CommunityRecord key={idx} event={event as CommunityEvent} />);
                break;
              case 'project':
                recordComponent = (<ProjectRecord key={idx} event={event as ProjectEvent} />);
                break;
            }

            return (
              <li key={idx} className="relative flex gap-x-4 pl-4">
                <div
                  className={clsx(
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
      </Container>
    </GuestLayout>
  );
}
