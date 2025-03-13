import { Head } from '@inertiajs/react';

import { GuestFooter } from '@/components/guest/guest-footer';
import { GuestNavbar } from '@/components/guest/guest-navbar';

export function GuestLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    return (
        <>
            {title && <Head title={title} />}

            <div className="flex h-full min-h-screen min-w-sm flex-col bg-stone-100 dark:bg-stone-900">
                <GuestNavbar showLogo={!route().current('guest.welcome')} />

                <main className="grow">{children}</main>

                <GuestFooter />
            </div>
        </>
    );
}
