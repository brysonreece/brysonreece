import './bootstrap';
import './styles/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { TooltipProvider } from './components/ui/tooltip';
import { initializeTheme } from './hooks/use-appearance';

export const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} // ${appName}` : `// ${appName}`),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
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

// This will set light / dark mode on load...
initializeTheme();
