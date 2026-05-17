import { APP_NAME } from './constants';

import './styles/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from './hooks/use-appearance';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';

createInertiaApp({
    title: (title) => (title ? `${title} // ${APP_NAME}` : `// ${APP_NAME}`),
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4b5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
