export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    content: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export type BlogSortOption = 'created_at' | 'updated_at' | 'published_at' | 'title';
export type BlogStatusFilter = 'published' | 'scheduled' | 'draft';
