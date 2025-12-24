export interface Post {
    id: string;
    title: string;
    description: string;
    author: string | null;
    content: string;
    tags: string[];
    cover_image_url: string | null;
    preview_image_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    status: PostStatus;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export type PostStatus = 'published' | 'scheduled' | 'draft';
