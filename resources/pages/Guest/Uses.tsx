import React, { FormEvent, PropsWithChildren } from 'react';
import { GuestLayout } from '@/layouts/GuestLayout';
import { Container } from '@/components/Container';

function Link({ href, children, onClick }: PropsWithChildren<{ href?: string; onClick?: (e: FormEvent) => void }>) {
  return (
      <a href={href} onClick={onClick} target="_blank" className="not-prose cursor-pointer">
          {children}
      </a>
  );
}

export default function Uses() {
    return (
        <GuestLayout title="Uses">
            <Container className="text-center mb-16">
                <h1 className="mx-auto mt-12 max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                    Uses
                </h1>

                <div className="text-left prose prose-slate mx-auto mt-8 lg:prose-lg">
                    <p className="lead text-center">A breakdown of the tools & products I enjoy most.</p>
                    <br />
                    <h2 className="mt-16">Daily Drivers</h2>
                    <ul>
                        <li><Link href="https://support.apple.com/kb/SP832">Apple iPhone 12 Pro Max</Link>: TODO.</li>
                        <li><Link href="#">Apple Macbook Pro (M1, 2020)</Link>: TODO.</li>
                        <li><Link href="#">Apple iPad Air (4th Gen)</Link>: TODO.</li>
                        <li><Link href="#">Valve Steam Deck</Link>: TODO.</li>
                    </ul>
                    <h2>Home Office</h2>
                    <ul>
                        <li><Link href="#">Apple Mac Mini (M1, 2020)</Link>: A compact desktop solution delivering reliable performance for all my development needs.</li>
                        <li><Link href="#">31.5" Dell 4K Monitor (U3223QE)</Link>: One of Dell's premier workstation monitors, with a built in Thunderbolt hub and a whopping six USB ports.</li>
                        <li><Link href="#">Herman-Miller Aeron</Link>: This thing has been a life changer, completely ridding my lower back of the chronic pain I had for years while sitting in low-quality desk chairs.</li>
                        <li><Link href="#">Apple Magic Keyboard</Link>: A perfectly fine keyboard for daily use from the crack-team at Apple. Mainly chosen for it's visual aesthetic while sitting on my desk.</li>
                        <li><Link href="#">Logitech MX Master</Link>: A beast, this mouse has held up for 6+ years without missing a beat. My only complaint is the battery life slowly degrading over time.</li>
                        <li><Link href="#">Elgato Stream Deck</Link>: One of the coolest timesavers I've come to love; VSCode automations, control of my Hue lights, video call controls - this thing does a ton. Sadly, no API or SDK is available at the time of writing.</li>
                    </ul>
                    <h2>Development</h2>
                    <ul>
                        <li><Link href="#">~/.dotfiles</Link>: TODO.</li>
                        <li><Link href="#">VSCode</Link>: TODO.</li>
                        <li><Link href="#">Fig.io</Link>: TODO.</li>
                        <li><Link href="#">Hyper.js</Link>: TODO.</li>
                        <li><Link href="#">ZSH</Link>: TODO.</li>
                        <li><Link href="#">Powerline10k</Link>: TODO.</li>
                    </ul>
                    <h2>DIY</h2>
                    <ul>
                        <li><Link href="#">Omtech AF-2435-80</Link>: The crown jewel of my workshop, "Big Blue". This 80-watt CO2 laser cutter was the culimation of months of planning and consideration. With this machine I can craft all sorts of things using materials ranging from wood, metal, stone, acrylic, to even leather!</li>
                        <li><Link href="#">Prusa i3 MK3</Link>: The 3D printer that arguably helped put the industry on the map more than any other consumer product. I can fire this thing up after months of sitting and immediately jump into a high quality 12+ hour print with no recalibration.</li>
                    </ul>
                    <h2>Augmented & Virtual Reality</h2>
                    <ul>
                        <li><Link href="#">Magic Leap ML1</Link>: TODO.</li>
                        <li><Link href="#">Microsoft Hololens</Link>: TODO.</li>
                        <li><Link href="#">Google Glass (Explorer Edition)</Link>: TODO.</li>
                        <li><Link href="#">Oculus Quest 2</Link>: TODO.</li>
                    </ul>
                </div>
            </Container>
        </GuestLayout>
    );
}
