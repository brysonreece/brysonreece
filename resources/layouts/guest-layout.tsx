import { Head } from '@inertiajs/react';

import { Footer } from '@/components/guest/footer';
import { GuestNavbar } from '@/components/guest/guest-navbar';

export function GuestLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <>
            <Head title={title} />

            <div className="h-full min-h-screen min-w-sm flex flex-col bg-stone-100 dark:bg-stone-900">
                <GuestNavbar showLogo={!route().current('welcome')} />

                <main className="grow">{children}</main>

                <Footer />
            </div>
        </>
    );
}
