import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    actions?: ReactNode;
}

export function AppSidebarHeader({ breadcrumbs = [], actions }: AppSidebarHeaderProps) {
    return (
        <header className="border-sidebar-border/70 dark:border-sidebar-border flex h-16 shrink-0 items-center gap-2 border px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 rounded-t-xl">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {actions && <div className="ml-auto">{actions}</div>}
        </header>
    );
}
