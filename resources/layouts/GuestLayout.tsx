import React, { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import { Banner } from '@/components/Banner';
import { GuestNavbar, GuestFooter } from '@/components/Navigation';
import route from 'ziggy-js';

interface Props {
  title: string;
}

export function GuestLayout({ title, children }: PropsWithChildren<Props>) {
    return (
        <>
            <Head title={title} />

            <Banner />

            <div className="h-full min-h-screen min-w-sm flex flex-col bg-gray-50">
                <GuestNavbar showLogo={!route().current('welcome')} />

                <main className="grow">{children}</main>

                <GuestFooter />
            </div>
        </>
    );
}
