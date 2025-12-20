import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    className?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: ReactNode;
}

export default ({ children, className, breadcrumbs, actions, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate className={className} breadcrumbs={breadcrumbs} actions={actions} {...props}>
        {children}
    </AppLayoutTemplate>
);
