import { promises as fs } from 'fs';

import { EventList } from "@/components/event-list";
import { Container } from "@/components/ui/container";

Page.title = "Projects";
Page.description = "A list of projects I've worked on.";

export async function getStaticProps(): Promise<{ props: { events: ProjectEvent[] } }> {
  const file = await fs.readFile(process.cwd() + '/life-events.json', 'utf8')
  const events = JSON.parse(file);

  return {
    props: {
      events: events.projects,
    },
  }
}

export default function Page({ events }: { events: ProjectEvent[] }) {
  return (
    <main className="grow">
      <Container className="max-w-2xl mb-16">
        <h1 className="mx-auto mt-12 mb-0 text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-6xl">
          Projects
        </h1>
        <p className="mx-auto mt-8 mb-24 text-center max-w-sm sm:max-w-lg lg:max-w-2xl font-display tracking-tight text-stone-600 dark:text-stone-300 text-2xl">
          The &ldquo;5 to 9s&rdquo; after the &ldquo;9 to 5s&rdquo;
        </p>

        <EventList events={events} />
      </Container>
    </main>
  );
}
