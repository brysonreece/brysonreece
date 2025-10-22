import { APP_NAME } from './constants';

import './bootstrap';

import(`./styles/blog.css`);

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

createInertiaApp({
    title: (title) => (title ? `${title} // ${APP_NAME}` : `// ${APP_NAME}`),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4b5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
