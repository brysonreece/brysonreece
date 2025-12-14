import { AppContent } from '@/components/app/app-content';
import { AppHeader } from '@/components/app/app-header';
import { AppShell } from '@/components/app/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren, ReactNode } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    actions,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; actions?: ReactNode }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} actions={actions} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
