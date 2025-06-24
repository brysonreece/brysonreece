import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { WelcomeLayout } from '@/layouts/welcome-layout';

import { Hero } from '@/components/guest/hero';
import { Container } from '@/components/ui/container';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <Container className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                <Hero />
            </Container>
        </>
    );
}

Welcome.layout = (children: ReactNode | undefined) => <WelcomeLayout>{children}</WelcomeLayout>;
