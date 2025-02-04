import './bootstrap';
import './styles/app.scss';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { TooltipProvider } from './components/ui/tooltip';
import { ReactNode } from 'react';
import { GuestLayout } from './layouts/GuestLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} // ${appName}` : appName),
    resolve: async (name) => {
        let page: any = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        );

        page.default.layout = page.default.layout || ((page: ReactNode & { title?: string }) => (
            <GuestLayout title={page.title || ''} children={page} />
        ));

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <TooltipProvider>
                <App {...props} />
            </TooltipProvider>,
        );
    },
    progress: {
        color: '#4b5563',
    },
});
