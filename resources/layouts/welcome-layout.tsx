import { Head, router } from '@inertiajs/react';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { GuestFooter } from '@/components/guest/guest-footer';
import { GuestNavbar } from '@/components/guest/guest-navbar';

export function WelcomeLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    const [transitioning, setTransitioning] = useState(false)

    useEffect(() => {
      router.on('start', () => setTransitioning(true))
      router.on('success', () => setTransitioning(false))
    }, [])

    const transitionClasses = useMemo(
      () => `transition ${transitioning ? 'duration-0 opacity-0' : 'duration-300 opacity-100'}`,
      [transitioning],
    )

    return (
        <>
            {title && <Head title={title} />}

            <div className="flex h-full min-h-screen min-w-sm flex-col bg-stone-100 dark:bg-stone-900">
                <GuestNavbar showLogo={!route().current('guest.welcome')} />

                <main className={cn('grow flex items-center justify-center', transitionClasses)}>{children}</main>

                <GuestFooter />
            </div>
        </>
    );
}
