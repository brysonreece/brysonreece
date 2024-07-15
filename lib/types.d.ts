type WithoutChildren<T> = Omit<T, "children">;

interface UrlResource {
    label: string;
    url: string;
}

interface LifeEvent {
    title: string;
    description?: string;
    dates: [string, string?];
    resources: UrlResource[];
}

interface CareerEvent extends LifeEvent {
    employer: string;
    location: string;
}

interface CommunityEvent extends LifeEvent {
    host: string;
    location: string;
}

interface ProjectEvent extends LifeEvent {}
