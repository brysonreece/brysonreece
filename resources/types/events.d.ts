
export enum EventType {
    CareerEventType,
    TalkEventType,
    ProjectEventType,
}

export interface Event {
    type: EventType;
    title: string;
    dates: string[];
    content: Nullable<string>;
}

export interface CareerEvent extends Event {
    employer: string;
    iconImage: string;
    title: string;
    dates: string[];
    location: string;
    content: string;
}

export interface TalkEvent extends Event {
    type: EventType.TalkEventType;
    host: string;
    iconImage: string;
    title: string;
    dates: string[];
    location: string;
    content: string;
}

export interface ProjectEvent extends Event {
    type: EventType.ProjectEventType;
    description: string;
    github: Nullable<string>;
    resources: Record<string, string>;
}
