import { Head, usePage } from '@inertiajs/react';

import { GuestFooter } from '@/components/guest/guest-footer';
import { GuestNavbar } from '@/components/guest/guest-navbar';

export function WelcomeLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    const { component } = usePage();

    return (
        <>
            {title && <Head title={title} />}

            <div className="flex h-full min-w-sm flex-col sm:min-h-screen">
                <GuestNavbar showLogo={component !== 'welcome'} />

                <main className="flex grow justify-center sm:items-center">{children}</main>

                <GuestFooter />
            </div>
        </>
    );
}
