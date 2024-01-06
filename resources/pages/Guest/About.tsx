import React, { CSSProperties, FormEvent, PropsWithChildren } from 'react';
import { GuestLayout } from '@/layouts/GuestLayout';
import { Container } from '@/components/Container';

import whitehouseImg from '@/images/about-me/whitehouse.jpg';
import musclemanImg from '@/images/about-me/muscleman.jpg';
import lunaImg from '@/images/about-me/luna.jpg';
import fieldImg from '@/images/about-me/field.jpg';

function Link({ href, children, onClick }: PropsWithChildren<{ href?: string; onClick?: (e: FormEvent) => void }>) {
    return (
        <a href={href} onClick={onClick} target="_blank" className="not-prose cursor-pointer">
            {children}
        </a>
    );
}

interface ImageProps extends CSSProperties {
    '--image': string;
    '--angle': string;
    '--x': string;
    '--y': string;
}

export default function About() {
    function handleEmailContact(e: FormEvent) {
        e.preventDefault();
        // hopefully this is obfuscated enough to prevent spam
        window.location.href = `mailto:${'hey'}@${'bryson'}.${'cc'}`;
    }

    return (
        <GuestLayout title="About">
            <Container className="text-center mb-16">
                <div className="photo-container font-handwriting text-3xl md:text-4xl mx-auto w-[85vmin] h-[100vmin] sm:w-[55vmin] sm:h-[70vmin] lg:w-[35vmin] lg:h-[50vmin]">
                    <div className="photo truncate" style={{
                        '--image': "url('" + whitehouseImg + "')",
                        '--angle': '-5deg',
                        '--x': '5%',
                        '--y': '15%',
                    } as ImageProps}>
                        <p className='lg:pt-3 truncate'>Washington D.C.</p>
                    </div>

                    <div className="photo truncate" style={{
                        '--image': "url('" + musclemanImg + "')",
                        '--angle': '-1deg',
                        '--x': '-10%',
                        '--y': '-20%',
                    } as ImageProps}>
                        <p className='lg:pt-3 truncate'>Definition of cool</p>
                    </div>

                    <div className="photo truncate" style={{
                        '--image': "url('" + lunaImg + "')",
                        '--angle': '7deg',
                        '--x': '10%',
                        '--y': '-7%',
                    } as ImageProps}>
                        <p className='lg:pt-3 truncate'>Luna, 2 years old</p>
                    </div>

                    <div className="photo truncate" style={{
                        '--image': "url('" + fieldImg + "')",
                        '--angle': '-4deg',
                        '--x': '-20%',
                        '--y': '5%',
                    } as ImageProps}>
                        <p className='lg:pt-3 truncate'>My wife and I</p>
                    </div>
                </div>

                <h1 className="mx-auto mt-12 max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                    About Me
                </h1>

                <div className="text-left prose prose-slate mx-auto mt-8 lg:prose-lg">
                    <p className="lead text-center">Maker, full-stack engineer, and avid learner.<br />🤖 Actual cyborg. 🤖</p>
                    <br />
                    <p className="mt-16">Hey there! I'm <Link href="https://github.com/brysonreece">@brysonreece</Link>. I spend most of my days creating new combinations of hardware and software, often trying to share what I've learned through various talks, workshops, and tweets along the way!</p>
                    <p>It's safe to say that hardware is my hobby, but software is my passion. It's obvious I'm a technologist though and through; I even have <Link href="https://dangerousthings.com/product/flexnt/">wireless RFID implants</Link> in each hand!</p>
                    <p>I'm also extremely proud of the following projects that I've had the honor to work with some very talented people on:</p>
                    <ul>
                        <li><span className="font-bold">2016</span>: Helped create <Link href="https://www.normantranscript.com/news/university_of_oklahoma/oval-brings-virtual-world-to-ou-students/article_2ecd4742-a3ef-5a28-9159-7e9f1ae84b86.html">O.V.A.L.</Link>, a VR learning tool which went on to host the world's first multi-state, multi-campus virtual reality pedagogy session.</li>
                        <li><span className="font-bold">2017</span>: Worked with <Link href="https://en.wikipedia.org/wiki/Jonathan_Stalling">Jonathan Stalling</Link> on a patented new form of Chinese pronunciation techniques. During this time I also co-founded <Link href="https://www.oudaily.com/a_and_e/ou-virtual-reality-association-allows-students-to-develop-technological-skills-prepare-for-future-job-opportunities/article_9b6f0702-27b7-11e8-8230-c37b71f3ea1e.html">OUVR</Link>, a collegiate organization that connected aspiring artists and developers with media development studios.</li>
                        <li><span className="font-bold">2018</span>: Created <Link href="https://github.com/athena-app">Athena</Link> with <Link href="https://ryandobyns.com">Ryan Dobyns</Link>, an alternative VR learning management system built for distributed education using low-cost hardware.</li>
                        <li><span className="font-bold">2019</span>: Joined <Link href="https://wellcaddie.com">WellCaddie</Link> as the third employee and engineering lead, going on to help raise our startup valuation to over $15M.</li>
                        <li><span className="font-bold">2021</span>: Helped <Link href="https://wunderite.com">Wunderite</Link> develop cutting-edge underwriting software and a contender to the industry-standard electronic signature solution, Docusign.</li>
                        <li><span className="font-bold">2022</span>: Led <Link href="https://whytespyder.com">WhyteSpyder</Link> and team to new highs with an overhaul of the popular online-retail management platform, <Link href="https://sku.ninja">SKUNinja</Link>.</li>
                        <li><span className="font-bold">2023</span>: After <Link href="https://talkbusiness.net/2021/11/sku-ninja-whytespyder-acquired-by-london-based-ascential/">an aquihire</Link> by <Link href="https://ascential.com">Ascential</Link>, helped lead the development of <Link href="https://www.flywheeldigital.com/retail-media">Commerce Cloud</Link> - a product management platform which later formed into the retail-consultancy powerhouse <Link href="https://www.flywheeldigital.com/">Flywheel Digital</Link> (<Link href="https://www.wsj.com/articles/omnicom-buys-e-commerce-shop-flywheel-digital-for-835-million-a40212d4">recently aquired by</Link> <Link href="https://omnicomgroup.com">Omnicom</Link> for $835M).</li>
                    </ul>
                    <p>When I'm not working, I'm usually spending time with my wife and dog, playing video games, or trying to learn something new.</p>
                    <p>Want to get in touch? <Link onClick={handleEmailContact}>Send me an email</Link> or <Link href="https://twitter.com/brysonio">send me a tweet</Link>!</p>

                </div>
            </Container>
        </GuestLayout >
    );
}
