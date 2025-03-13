import { Head } from '@inertiajs/react';
import { FormEvent, ReactNode } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';

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
                        Hey there! I'm{' '}
                        <a href="https://github.com/brysonreece" target="_blank" rel="noopener noreferrer">
                            @brysonreece
                        </a>
                        . I spend most of my days creating new combinations of hardware and software, often trying to share what I've learned through
                        various talks, workshops, and tweets along the way!
                    </p>
                    <p>
                        It's safe to say that hardware is my hobby, but software is my passion. It's obvious I'm a technologist though and through; I
                        even have{' '}
                        <a href="https://dangerousthings.com/product/flexnt/" target="_blank" rel="noopener noreferrer">
                            wireless RFID implants
                        </a>{' '}
                        in each hand!
                    </p>
                    <p>I'm also extremely proud of the following projects that I've had the honor to work with some very talented people on:</p>
                    <ul>
                        <li>
                            <span className="font-bold">2016</span>: Helped create{' '}
                            <a
                                href="https://www.normantranscript.com/news/university_of_oklahoma/oval-brings-virtual-world-to-ou-students/article_2ecd4742-a3ef-5a28-9159-7e9f1ae84b86.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                O.V.A.L.
                            </a>
                            , a VR learning tool which went on to host the world's first multi-state, multi-campus virtual reality pedagogy session.
                        </li>
                        <li>
                            <span className="font-bold">2017</span>: Worked with{' '}
                            <a href="https://en.wikipedia.org/wiki/Jonathan_Stalling">Jonathan Stalling</a> on a patented new form of Chinese
                            pronunciation techniques. During this time I also co-founded{' '}
                            <a
                                href="https://www.oudaily.com/a_and_e/ou-virtual-reality-association-allows-students-to-develop-technological-skills-prepare-for-future-job-opportunities/article_9b6f0702-27b7-11e8-8230-c37b71f3ea1e.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                OUVR
                            </a>
                            , a collegiate organization that connected aspiring artists and developers with media development studios.
                        </li>
                        <li>
                            <span className="font-bold">2018</span>: Created{' '}
                            <a href="https://github.com/athena-app" target="_blank" rel="noopener noreferrer">
                                Athena
                            </a>{' '}
                            with{' '}
                            <a href="https://ryandobyns.com" target="_blank" rel="noopener noreferrer">
                                Ryan Dobyns
                            </a>
                            , an alternative VR learning management system built for distributed education using low-cost hardware.
                        </li>
                        <li>
                            <span className="font-bold">2019</span>: Joined{' '}
                            <a href="https://wellcaddie.com" target="_blank" rel="noopener noreferrer">
                                WellCaddie
                            </a>{' '}
                            as the third employee and engineering lead, going on to help raise our startup valuation to over $15M.
                        </li>
                        <li>
                            <span className="font-bold">2021</span>: Helped{' '}
                            <a href="https://wunderite.com" target="_blank" rel="noopener noreferrer">
                                Wunderite
                            </a>{' '}
                            develop cutting-edge underwriting software and a contender to the industry-standard electronic signature solution,
                            Docusign.
                        </li>
                        <li>
                            <span className="font-bold">2022</span>: Led{' '}
                            <a href="https://whytespyder.com" target="_blank" rel="noopener noreferrer">
                                WhyteSpyder
                            </a>{' '}
                            and team to new highs with an overhaul of the popular online-retail management platform,{' '}
                            <a href="https://sku.ninja" target="_blank" rel="noopener noreferrer">
                                SKUNinja
                            </a>
                            .
                        </li>
                        <li>
                            <span className="font-bold">2023</span>: After{' '}
                            <a
                                href="https://talkbusiness.net/2021/11/sku-ninja-whytespyder-acquired-by-london-based-ascential/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                an aquihire
                            </a>{' '}
                            by{' '}
                            <a href="https://ascential.com" target="_blank" rel="noopener noreferrer">
                                Ascential
                            </a>
                            , helped lead the development of{' '}
                            <a href="https://www.flywheeldigital.com/retail-media" target="_blank" rel="noopener noreferrer">
                                Commerce Cloud
                            </a>{' '}
                            - a e-commerce management platform grown out of{' '}
                            <a href="https://www.flywheeldigital.com/" target="_blank" rel="noopener noreferrer" className="whitespace-no-wrap">
                                Flywheel Digital
                            </a>{' '}
                            (
                            <a
                                href="https://www.wsj.com/articles/omnicom-buys-e-commerce-shop-flywheel-digital-for-835-million-a40212d4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                recently aquired by
                            </a>{' '}
                            <a href="https://omnicomgroup.com" target="_blank" rel="noopener noreferrer">
                                Omnicom
                            </a>{' '}
                            for $835M).
                        </li>
                    </ul>
                    <p>
                        When I'm not working, I'm usually spending time with my wife, daughter, and two dogs ⸺ or learning something new!
                    </p>
                    <p>
                        Want to get in touch?{' '}
                        <a href="#" onClick={handleEmailContact}>
                            Send me an email
                        </a>{' '}
                        or{' '}
                        <a href="https://twitter.com/brysonio" target="_blank" rel="noopener noreferrer">
                            tweet at me
                        </a>
                        !
                    </p>
                </div>
            </Container>
        </>
    );
}

About.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
