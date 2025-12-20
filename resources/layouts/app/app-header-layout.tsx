import { AppContent } from '@/components/app/app-content';
import { AppHeader } from '@/components/app/app-header';
import { AppShell } from '@/components/app/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren, ReactNode } from 'react';

export default function AppHeaderLayout({
    children,
    className,
    breadcrumbs,
    actions,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; actions?: ReactNode; className?: string }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} actions={actions} />
            <AppContent className={className}>{children}</AppContent>
        </AppShell>
    );
}
