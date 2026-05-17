import { Head, usePage } from '@inertiajs/react';

import { GuestFooter } from '@/components/guest/guest-footer';
import { GuestNavbar } from '@/components/guest/guest-navbar';

export function GuestLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    const { component } = usePage();

    return (
        <>
            {title && <Head title={title} />}

            <div className="flex h-full min-h-screen min-w-sm flex-col">
                <GuestNavbar showLogo={component !== 'welcome'} />

                <main className="grow">{children}</main>

                <GuestFooter />
            </div>
        </>
    );
}
