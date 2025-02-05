import { Head } from '@inertiajs/react';
import { CSSProperties, FormEvent } from 'react';

import { Container } from '@/components/ui/container';

import whitehouseImg from '@/images/about-me/whitehouse.jpg';
import musclemanImg from '@/images/about-me/muscleman.jpg';
import lunaImg from '@/images/about-me/luna.jpg';
import fieldImg from '@/images/about-me/field.jpg';

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
    <>
      <Head title="About Me" />

      <Container className="mb-16 max-w-3xl">
        <div className="photo-container font-handwriting text-3xl md:text-4xl mx-auto w-[85vmin] h-[100vmin] sm:w-[55vmin] sm:h-[70vmin] lg:w-[35vmin] lg:h-[50vmin]">
          <div
            className="photo truncate"
            style={
              {
                '--image': "url('" + whitehouseImg + "')",
                '--angle': '-5deg',
                '--x': '5%',
                '--y': '15%',
                '--scale-from': '0.35',
                '--scale-to': '1',
              } as ImageProps
            }
          >
            <p className='lg:pt-3 text-3xl sm:text-4xl truncate'>Washington D.C.</p>
          </div>

          <div
            className="photo truncate"
            style={
              {
                '--image': "url('" + musclemanImg + "')",
                '--angle': '-1deg',
                '--x': '-10%',
                '--y': '-20%',
                '--scale-from': '0.35',
                '--scale-to': '1',
              } as ImageProps
            }
          >
            <p className='lg:pt-3 text-3xl sm:text-4xl truncate'>Definition of cool</p>
          </div>

          <div
            className="photo truncate"
            style={
              {
                '--image': "url('" + lunaImg + "')",
                '--angle': '7deg',
                '--x': '10%',
                '--y': '-7%',
                '--scale-from': '0.35',
                '--scale-to': '1',
              } as ImageProps
            }
          >
            <p className='lg:pt-3 text-3xl sm:text-4xl truncate'>Luna, 2 years old</p>
          </div>

          <div
            className="photo truncate"
            style={
              {
                '--image': "url('" + fieldImg + "')",
                '--angle': '-4deg',
                '--x': '-20%',
                '--y': '5%',
                '--scale-from': '0.35',
                '--scale-to': '1',
              } as ImageProps
            }
          >
            <p className='lg:pt-3 text-3xl sm:text-4xl truncate'>My wife and I</p>
          </div>
        </div>

        <h1 className="mx-auto mt-12 mb-0 text-center max-w-4xl font-display text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-6xl">
          About Me
        </h1>

        <p className="mx-auto mt-8 mb-24 text-center max-w-sm sm:max-w-lg lg:max-w-2xl font-display tracking-tight text-stone-600 dark:text-stone-300 text-2xl">
            Maker, full-stack engineer, and avid learner
            <br />
            🤖 Actual cyborg 🤖
        </p>

        <div className="prose prose-stone dark:prose-invert sm:prose-base lg:prose-lg mx-auto">
          <p>
            Hey there! I'm{' '}
            <a href="https://github.com/brysonreece" target="_blank" rel="noopener noreferrer">@brysonreece</a>. I
            spend most of my days creating new combinations of hardware and
            software, often trying to share what I've learned through various
            talks, workshops, and tweets along the way!
          </p>
          <p>
            It's safe to say that hardware is my hobby, but software is my
            passion. It's obvious I'm a technologist though and through; I even
            have{' '}
            <a href="https://dangerousthings.com/product/flexnt/" target="_blank" rel="noopener noreferrer">
              wireless RFID implants
            </a>{' '}
            in each hand!
          </p>
          <p>
            I'm also extremely proud of the following projects that I've had the
            honor to work with some very talented people on:
          </p>
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
              , a VR learning tool which went on to host the world's first
              multi-state, multi-campus virtual reality pedagogy session.
            </li>
            <li>
              <span className="font-bold">2017</span>: Worked with{' '}
              <a href="https://en.wikipedia.org/wiki/Jonathan_Stalling">
                Jonathan Stalling
              </a>{' '}
              on a patented new form of Chinese pronunciation techniques. During
              this time I also co-founded{' '}
              <a
                href="https://www.oudaily.com/a_and_e/ou-virtual-reality-association-allows-students-to-develop-technological-skills-prepare-for-future-job-opportunities/article_9b6f0702-27b7-11e8-8230-c37b71f3ea1e.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                OUVR
              </a>
              , a collegiate organization that connected aspiring artists and
              developers with media development studios.
            </li>
            <li>
              <span className="font-bold">2018</span>: Created{' '}
              <a href="https://github.com/athena-app" target="_blank" rel="noopener noreferrer">Athena</a> with{' '}
              <a href="https://ryandobyns.com" target="_blank" rel="noopener noreferrer">Ryan Dobyns</a>, an
              alternative VR learning management system built for distributed
              education using low-cost hardware.
            </li>
            <li>
              <span className="font-bold">2019</span>: Joined{' '}
              <a href="https://wellcaddie.com" target="_blank" rel="noopener noreferrer">WellCaddie</a> as the third
              employee and engineering lead, going on to help raise our startup
              valuation to over $15M.
            </li>
            <li>
              <span className="font-bold">2021</span>: Helped{' '}
              <a href="https://wunderite.com" target="_blank" rel="noopener noreferrer">Wunderite</a> develop
              cutting-edge underwriting software and a contender to the
              industry-standard electronic signature solution, Docusign.
            </li>
            <li>
              <span className="font-bold">2022</span>: Led{' '}
              <a href="https://whytespyder.com" target="_blank" rel="noopener noreferrer">WhyteSpyder</a> and team
              to new highs with an overhaul of the popular online-retail
              management platform,{' '}
              <a href="https://sku.ninja" target="_blank" rel="noopener noreferrer">SKUNinja</a>.
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
              by <a href="https://ascential.com" target="_blank" rel="noopener noreferrer">Ascential</a>, helped
              lead the development of{' '}
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
              <a href="https://omnicomgroup.com" target="_blank" rel="noopener noreferrer">Omnicom</a> for $835M).
            </li>
          </ul>
          <p>
            When I'm not working, I'm usually spending time with my wife and
            dog, playing video games, or trying to learn something new.
          </p>
          <p>
            Want to get in touch?{' '}
            <a href="#" onClick={handleEmailContact}>Send me an email</a> or{' '}
            <a href="https://twitter.com/brysonio" target="_blank" rel="noopener noreferrer">send me a tweet</a>!
          </p>
        </div>
      </Container>
    </>
  );
}
