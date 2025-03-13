import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null;
    };
    ziggy: Config & { location: string };
};

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    profile_photo_path: Nullable<string>;
    profile_photo_url: string;
    two_factor_enabled: boolean;
    email_verified_at: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Session {
    id: number;
    ip_address: string;
    is_current_device: boolean;
    agent: {
        is_desktop: boolean;
        platform: string;
        browser: string;
    };
    last_active: DateTime;
}

export enum EventType {
    CareerEventType,
    CommunityEventType,
    ProjectEventType,
}

export interface Event {
    type: EventType;
    title: string;
    dates: string[];
    content: Nullable<string>;
}

export interface CareerEvent extends Event {
    type: EventType.CareerEventType;
    employer: string;
    logoUrl: string;
    location: string;
}

export interface CommunityEvent extends Event {
    type: EventType.CommunityEventType;
    host: string;
    logoUrl: string;
    location: string;
}

export interface ProjectEvent extends Event {
    type: EventType.ProjectEventType;
    description: string;
    github: Nullable<string>;
    resources: Record<string, string>;
}
