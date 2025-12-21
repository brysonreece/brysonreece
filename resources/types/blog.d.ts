export interface BlogPost {
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
    status: 'published' | 'scheduled' | 'draft';
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export type BlogSortOption = 'created_at' | 'updated_at' | 'published_at' | 'title';
export type BlogStatusFilter = 'published' | 'scheduled' | 'draft';
