import { AppContent } from '@/components/app/app-content';
import { AppShell } from '@/components/app/app-shell';
import { AppSidebar } from '@/components/app/app-sidebar';
import { AppSidebarHeader } from '@/components/app/app-sidebar-header';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren, type ReactNode } from 'react';

export default function AppSidebarLayout({
    children,
    className,
    breadcrumbs = [],
    actions,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; actions?: ReactNode, className?: string }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="max-w-full">
                <AppSidebarHeader breadcrumbs={breadcrumbs} actions={actions} />
                <div className={cn('flex p-4 h-full flex-1 overflow-hidden rounded-b-xl border-sidebar-border/70 dark:border-sidebar-border border border-t-0', className)}>
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
