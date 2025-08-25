type AppProject =
    | 'blog'
    | 'emojicons';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Laravel';
export const APP_PROJECT: AppProject = import.meta.env.VITE_APP_PROJECT || 'blog';
