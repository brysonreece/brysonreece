import { Head } from '@inertiajs/react';
import { FormEvent, ReactNode } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';
import { ExternalLink } from '@/components/ui/external-link';
import { type Project, ProjectCard } from '@/components/ui/project-card';

const linkStyles =
    'underline underline-offset-2 decoration-muted-foreground \
    hover:decoration-current hover:text-accent-foreground \
    transition-colors';

const projects: Project[] = [
    {
        year: '2016',
        title: 'O.V.A.L.',
        coverImage: "url('/storage/about-me/oval.jpg')",
        description: (
            <span>
                Helped create{' '}
                <ExternalLink
                    className={linkStyles}
                    href="https://www.normantranscript.com/news/university_of_oklahoma/oval-brings-virtual-world-to-ou-students/article_2ecd4742-a3ef-5a28-9159-7e9f1ae84b86.html"
                >
                    O.V.A.L.
                </ExternalLink>
                , a VR learning environment which went on to host the world's first multi-state, multi-campus virtual reality pedagogy session.
            </span>
        ),
    },
    {
        year: '2017',
        title: 'Seedling',
        coverImage: "url('/storage/about-me/seedling.jpg')",
        description: (
            <span>
                Worked with{' '}
                <ExternalLink className={linkStyles} href="https://en.wikipedia.org/wiki/Jonathan_Stalling">
                    Jonathan Stalling
                </ExternalLink>{' '}
                on a patented, interactive children's toy that taught English pronunciation using NFC-enabled building blocks. On permanent display at
                the University of Beijing.
            </span>
        ),
    },
    {
        year: '2017',
        title: 'OUVR',
        coverImage: "url('/storage/about-me/ouvr.jpg')",
        description: (
            <span>
                Along with{' '}
                <ExternalLink className={linkStyles} href="https://github.com/ryandobby">
                    Ryan Dobyns
                </ExternalLink>
                , founded a collegiate organization that connected aspiring artists & programmers with media/dev studios (like{' '}
                <ExternalLink className={linkStyles} href="https://tech.facebook.com/reality-labs/">
                    Meta Reality Labs
                </ExternalLink>
                ).
            </span>
        ),
    },
    {
        year: '2018',
        title: 'Athena',
        coverImage: "url('/storage/about-me/athena.png')",
        description: (
            <span>
                Created{' '}
                <ExternalLink className={linkStyles} href="https://github.com/athena-app">
                    Athena
                </ExternalLink>{' '}
                with{' '}
                <ExternalLink className={linkStyles} href="https://github.com/ryandobby">
                    Ryan Dobyns
                </ExternalLink>
                , an alternative VR learning management system built for distributed education using low-cost hardware.
            </span>
        ),
    },
    {
        year: '2019',
        title: 'WellCaddie',
        coverImage: "url('/storage/about-me/wellcaddie.png')",
        description: (
            <span>
                Joined{' '}
                <ExternalLink className={linkStyles} href="https://wellcaddie.com">
                    WellCaddie
                </ExternalLink>{' '}
                as the third employee and engineering lead.
                <br />
                <br />
                WellCaddie is now worth over $15M.
            </span>
        ),
    },
    {
        year: '2021',
        title: 'Wunderite',
        coverImage: "url('/storage/about-me/wunderite.jpg')",
        description: (
            <span>
                Helped{' '}
                <ExternalLink className={linkStyles} href="https://wunderite.com">
                    Wunderite
                </ExternalLink>{' '}
                develop cutting-edge underwriting software and a contender to the industry-standard electronic signature solution, Docusign.
            </span>
        ),
    },
    {
        year: '2022',
        title: 'WhyteSpyder',
        coverImage: "url('/storage/about-me/whytespyder.jpg')",
        description: (
            <span>
                Led{' '}
                <ExternalLink className={linkStyles} href="https://whytespyder.com">
                    WhyteSpyder
                </ExternalLink>{' '}
                and team to new highs with an overhaul of the popular online-retail management platform,{' '}
                <ExternalLink className={linkStyles} href="https://sku.ninja">
                    SKUNinja
                </ExternalLink>
                .
            </span>
        ),
    },
    {
        year: '2023',
        title: 'Flywheel Digital',
        coverImage: "url('/storage/about-me/flywheel.png')",
        description: (
            <span>
                After{' '}
                <ExternalLink
                    className={linkStyles}
                    href="https://talkbusiness.net/2021/11/sku-ninja-whytespyder-acquired-by-london-based-ascential/"
                >
                    an aquihire
                </ExternalLink>{' '}
                by{' '}
                <ExternalLink className={linkStyles} href="https://ascential.com">
                    Ascential
                </ExternalLink>
                , helped lead the development of{' '}
                <ExternalLink className={linkStyles} href="https://www.flywheeldigital.com/retail-media">
                    Commerce Cloud
                </ExternalLink>{' '}
                - a e-commerce management platform grown out of{' '}
                <ExternalLink className={linkStyles} href="https://www.flywheeldigital.com/">
                    Flywheel Digital
                </ExternalLink>{' '}
                (
                <ExternalLink
                    className={linkStyles}
                    href="https://www.wsj.com/articles/omnicom-buys-e-commerce-shop-flywheel-digital-for-835-million-a40212d4"
                >
                    recently aquired by
                </ExternalLink>{' '}
                <ExternalLink className={linkStyles} href="https://omnicomgroup.com">
                    Omnicom
                </ExternalLink>{' '}
                for $835M).
            </span>
        ),
    },
];

export default function About() {
    function handleEmailContact(e: FormEvent) {
        e.preventDefault();
        // hopefully this is obfuscated enough to prevent spam
        window.location.href = `mailto:${'hey'}@${'bryson'}.${'cc'}`;
    }

    return (
        <>
            <Head title="About Me" />

            <Container className="mb-16 max-w-3xl">
                <h1 className="font-display mx-auto mt-12 mb-0 max-w-4xl text-center text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
                    About Me
                </h1>

                <p className="font-display mx-auto mt-8 mb-24 max-w-sm text-center text-2xl tracking-tight text-stone-600 sm:max-w-lg lg:max-w-2xl dark:text-stone-300">
                    A dad, full-stack engineer, and avid learner
                    <br />
                    <br />
                    🤖 Actual cyborg 🤖
                </p>

                <div className="prose prose-stone dark:prose-invert sm:prose-base lg:prose-lg mx-auto">
                    <p>
                        Hey there! 👋 I'm{' '}
                        <ExternalLink className={linkStyles} href="https://github.com/brysonreece">
                            @brysonreece
                        </ExternalLink>{' '}
                        ⸺ I spend most of my days creating new combinations of hardware and software, often trying to share what I've learned through
                        various talks, workshops, and tweets along the way.
                    </p>
                    <p>
                        I have a <span className="font-bold">deep</span> passion for software engineering, the act of invention, and the way those
                        things can transform the world around us. Unsure about just how much I'm committed to the lifestyle? I implanted{' '}
                        <ExternalLink className={linkStyles} href="https://dangerousthings.com/product/flexnt/">
                            wireless RFID tags
                        </ExternalLink>{' '}
                        into each of my hands!
                    </p>
                    <p>
                        When I'm not working, I'm usually picking up a new technology or skill, listening to Laravel-related podcasts, or spending
                        time with my family; a wife, daughter, and two dogs who have more energy than I ever thought was possible.
                    </p>
                    <p>
                        I'm also extremely proud of the following projects I've had the honor to work on, all with people much smarter than me. I
                        encourage you to check each of them out! ⸺
                    </p>
                </div>
            </Container>
            <Container className="max-w-3xl lg:max-w-4xl">
                <ul className="not-prose grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </ul>
            </Container>
            <Container className="mt-16 max-w-3xl">
                <div className="prose prose-stone dark:prose-invert sm:prose-base lg:prose-lg mx-auto text-center">
                    <p>
                        Feel free to{' '}
                        <ExternalLink className={linkStyles} onClick={handleEmailContact}>
                            email me
                        </ExternalLink>
                        , reach out via{' '}
                        <ExternalLink className={linkStyles} href="https://x.com/brysonio">
                            X
                        </ExternalLink>
                        , or follow me on{' '}
                        <ExternalLink className={linkStyles} href="https://github.com/brysonreece">
                            GitHub
                        </ExternalLink>
                        !
                    </p>
                </div>
            </Container>
        </>
    );
}

About.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
