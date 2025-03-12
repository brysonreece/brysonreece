import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { GuestLayout } from '@/layouts/guest-layout';

import { Hero } from '@/components/guest/hero';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <Hero />
        </>
    );
}

Welcome.layout = (children: ReactNode | undefined) => <GuestLayout>{children}</GuestLayout>;
