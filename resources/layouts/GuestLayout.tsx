import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

import { Footer } from '@/components/guest/footer';
import { Navbar } from '@/components/guest/navbar';

interface Props {
  title?: string;
}

export function GuestLayout({ title, children }: PropsWithChildren<Props>) {
    return (
        <>
            { title && <Head title={title} /> }

            <div className="h-full min-h-screen min-w-sm flex flex-col bg-stone-100 dark:bg-stone-900">
                <Navbar showLogo={!route().current('welcome')} />

                <main className="grow">{children}</main>

                <Footer />
            </div>
        </>
    );
}
