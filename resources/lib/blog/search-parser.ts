import { type BlogSortOption, type BlogStatusFilter } from '@/types/blog';

export interface ParsedSearchQuery {
    searchText: string;
    filters: BlogStatusFilter[];
    tags: string[];
    sortBy: BlogSortOption;
}

/**
 * Parses a search query string into structured search parameters.
 *
 * Syntax:
 * - Plain text: Search terms
 * - f:status: Filter by status (published, scheduled, draft)
 * - t:tag: Filter by tag (e.g., t:Laravel, t:PHP)
 * - s:field: Sort by field (created, updated, published, title)
 *
 * Examples:
 * - "Laravel" -> search for "Laravel", all filters, default sort
 * - "React f:published" -> search for "React", only published posts
 * - "f:draft f:scheduled s:updated" -> drafts and scheduled, sorted by updated
 * - "TypeScript f:published s:title" -> search "TypeScript", published, sorted by title
 * - "t:Laravel t:PHP" -> posts tagged with Laravel or PHP
 * - "f:published t:React s:created" -> published posts tagged with React, sorted by created date
 */
export function parseSearchQuery(query: string): ParsedSearchQuery {
    const filters: BlogStatusFilter[] = [];
    const tags: string[] = [];
    const searchTerms: string[] = [];
    let sortBy: BlogSortOption = 'created_at';

    // Split query into tokens
    const tokens = query.trim().split(/\s+/);

    for (const token of tokens) {
        if (token.startsWith('f:')) {
            // Filter token
            const filterValue = token.substring(2).toLowerCase();
            if (filterValue === 'published' || filterValue === 'scheduled' || filterValue === 'draft') {
                if (!filters.includes(filterValue)) {
                    filters.push(filterValue as BlogStatusFilter);
                }
            }
        } else if (token.startsWith('t:')) {
            // Tag token
            const tagValue = token.substring(2);
            if (tagValue && !tags.includes(tagValue)) {
                tags.push(tagValue);
            }
        } else if (token.startsWith('s:')) {
            // Sort token
            const sortValue = token.substring(2).toLowerCase();
            switch (sortValue) {
                case 'created':
                    sortBy = 'created_at';
                    break;
                case 'updated':
                    sortBy = 'updated_at';
                    break;
                case 'published':
                    sortBy = 'published_at';
                    break;
                case 'title':
                    sortBy = 'title';
                    break;
            }
        } else if (token) {
            // Regular search term
            searchTerms.push(token);
        }
    }

    // If no filters specified, include all
    const finalFilters = filters.length > 0 ? filters : (['published', 'scheduled', 'draft'] as BlogStatusFilter[]);

    return {
        searchText: searchTerms.join(' '),
        filters: finalFilters,
        tags,
        sortBy,
    };
}

/**
 * Checks if a blog post matches the search text.
 * Searches in title, description, content, and tags.
 */
export function matchesSearchText(
    post: { title: string; description: string; content: string; tags: string[] },
    searchText: string,
): boolean {
    if (!searchText) return true;

    const lowerSearch = searchText.toLowerCase();
    const searchableText = [post.title, post.description, post.content, ...post.tags].join(' ').toLowerCase();

    return searchableText.includes(lowerSearch);
}
