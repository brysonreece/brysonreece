import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Container } from '@/components/ui/container';

export default function Uses() {
    return (
        <>
            <Head title="What I Use" />

            <Container className="mb-16 max-w-3xl">
                <h1 className="font-display mx-auto mt-12 mb-0 max-w-4xl text-center text-5xl font-medium tracking-tight text-stone-900 sm:text-6xl dark:text-stone-100">
                    What I Use
                </h1>

                <p className="font-display mx-auto mt-8 mb-24 max-w-sm text-center text-2xl tracking-tight text-stone-600 sm:max-w-lg lg:max-w-2xl dark:text-stone-300">
                    A breakdown of the tools & products I enjoy most
                </p>

                <div className="prose prose-stone dark:prose-invert sm:prose-base lg:prose-lg mx-auto">
                    <h2>Daily Drivers</h2>
                    <ul>
                        <li>
                            <a href="https://support.apple.com/en-us/121554" target="_blank" rel="noopener noreferrer">
                                Apple Macbook Pro (16-inch, M4 Max, 2024)
                            </a>
                        </li>
                        <li>
                            <a href="https://support.apple.com/en-us/111828" target="_blank" rel="noopener noreferrer">
                                Apple iPhone 15 Pro Max
                            </a>
                        </li>
                        <li>
                            <a href="https://support.apple.com/kb/SP828" target="_blank" rel="noopener noreferrer">
                                Apple iPad Air (4th Gen)
                            </a>
                        </li>
                        <li>
                            <a href="https://store.steampowered.com/steamdeck" target="_blank" rel="noopener noreferrer">
                                Valve Steam Deck
                            </a>
                        </li>
                    </ul>
                    <h2>Home Office</h2>
                    <ul>
                        <li>
                            <a href="https://support.apple.com/kb/SP823" target="_blank" rel="noopener noreferrer">
                                Apple Mac Mini (M1, 2020)
                            </a>
                            <span>: A compact desktop solution delivering reliable performance for all my development needs.</span>
                        </li>
                        <li>
                            <a
                                href="https://www.dell.com/en-us/shop/dell-ultrasharp-32-4k-usb-c-hub-monitor-u3223qe/apd/210-bdph/monitors-monitor-accessories"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                31.5" Dell 4K Monitor (U3223QE)
                            </a>
                            <span>: One of Dell's premier workstation monitors, with a built in Thunderbolt hub and a whopping six USB ports.</span>
                        </li>
                        <li>
                            <a
                                href="https://store.hermanmiller.com/office-chairs-aeron/aeron-chair/2195348.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Herman-Miller Aeron
                            </a>
                            <span>
                                : This thing has been a life changer, completely ridding my lower back of the chronic pain I had sitting in
                                low-quality desk chairs.
                            </span>
                        </li>
                        <li>
                            <a
                                href="https://www.apple.com/shop/product/MK2A3LL/A/magic-keyboard-us-english"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apple Magic Keyboard
                            </a>
                            <span>
                                : A perfectly fine keyboard for daily use from the crack-team at Apple. Mainly chosen for it's visual aesthetic while
                                sitting on my desk.
                            </span>
                        </li>
                        <li>
                            <a
                                href="https://www.logitech.com/en-us/products/mice/mx-master-3s.910-006557.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Logitech MX Master
                            </a>
                            <span>
                                : A beast, this mouse has held up for 6+ years without missing a beat. My only complaint is the battery life slowly
                                degrading over time.
                            </span>
                        </li>
                        <li>
                            <a href="https://elgato.com/us/en/p/stream-deck-mk2-black" target="_blank" rel="noopener noreferrer">
                                Elgato Stream Deck
                            </a>
                            <span>
                                : A great tool for streamers, but also fantastic for productivity. I use this thing daily for my development work.
                            </span>
                        </li>
                    </ul>
                    <h2>Development</h2>
                    <ul>
                        <li>
                            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">
                                VSCode
                            </a>
                        </li>
                        <li>
                            <a href="https://hyper.is/" target="_blank" rel="noopener noreferrer">
                                Hyper.js
                            </a>
                        </li>
                        <li>
                            <a href="https://www.zsh.org/" target="_blank" rel="noopener noreferrer">
                                ZSH
                            </a>
                            <p>
                                Config:{' '}
                                <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer">
                                    Oh My ZSH
                                </a>
                            </p>
                            <p>
                                Theme:{' '}
                                <a href="https://github.com/romkatv/powerlevel10k" target="_blank" rel="noopener noreferrer">
                                    Powerline10k
                                </a>
                            </p>
                        </li>
                    </ul>
                    <h2>DIY</h2>
                    <ul>
                        <li>
                            <a
                                href="https://omtechlaser.com/products/80w-co2-laser-engraver-cutter-usb-8b69-u2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Omtech AF-2435-80
                            </a>
                            <span>
                                : The crown jewel of my workshop, "Big Blue". This 80-watt CO2 laser cutter was the culimation of months of planning
                                and consideration. With this machine I can craft all sorts of things using materials ranging from wood, metal, stone,
                                acrylic, to even leather!
                            </span>
                        </li>
                        <li>
                            <a href="https://www.prusa3d.com/category/original-prusa-i3-mk3s/" target="_blank" rel="noopener noreferrer">
                                Prusa i3 MK3
                            </a>
                            <span>
                                : The 3D printer that arguably helped put the industry on the map more than any other consumer product. I can fire
                                this thing up after months of sitting and immediately jump into a high quality 12+ hour print with no recalibration.
                            </span>
                        </li>
                    </ul>
                    <h2>Neat Collectibles</h2>
                    <p>
                        I'm an avid collector of memorable pieces of technology that have shaped their own corners of the industry. Here are some of
                        my favorites:
                    </p>
                    <ul>
                        <li>
                            <a href="https://en.wikipedia.org/wiki/Google_Search_Appliance" target="_blank" rel="noopener noreferrer">
                                Google T4 G100 Search Appliance
                            </a>
                            {' '}
                            (I own three!)
                        </li>
                        <li>
                            <a
                                href="https://ml1-developer.magicleap.com/en-us/learn/guides/magic-leap-one-overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Magic Leap ML1
                            </a>
                        </li>
                        <li>
                            <a href="https://www.microsoft.com/en-us/hololens" target="_blank" rel="noopener noreferrer">
                                Microsoft Hololens
                            </a>
                        </li>
                        <li>
                            <a href="https://developers.google.com/glass" target="_blank" rel="noopener noreferrer">
                                Google Glass (Explorer Edition)
                            </a>
                        </li>
                        <li>
                            <a href="https://friend.com" target="_blank" rel="noopener noreferrer">
                                Friend
                            </a>
                            {' / '}
                            <a href="https://omi.me" target="_blank" rel="noopener noreferrer">
                                Omi.me
                            </a>
                            {' '}
                            Wearables
                        </li>
                    </ul>
                </div>
            </Container>
        </>
    );
}

Uses.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
