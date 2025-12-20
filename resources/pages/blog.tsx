import { BlogDetail } from '@/components/blog/blog-detail';
import { BlogList, getPostStatusType } from '@/components/blog/blog-list';
import AppLayout from '@/layouts/app-layout';
import { matchesSearchText, parseSearchQuery } from '@/lib/blog/search-parser';
import { type BreadcrumbItem } from '@/types';
import { type BlogPost } from '@/types/blog';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import postsData from '../../data/posts.json';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/blog',
    },
];

export default function Blog() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const allPosts = postsData as BlogPost[];

    const filteredAndSortedPosts = useMemo(() => {
        const { searchText, filters, tags, sortBy } = parseSearchQuery(searchQuery);

        // First, filter by status, tags, and search text
        const filtered = allPosts.filter((post) => {
            const postStatus = getPostStatusType(post.published_at);
            const matchesStatus = filters.includes(postStatus);
            const matchesText = matchesSearchText(post, searchText);

            // If tags are specified, check if post has at least one of them
            const matchesTags = tags.length === 0 || tags.some((tag) =>
                post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
            );

            return matchesStatus && matchesText && matchesTags;
        });

        // Then sort the filtered results
        const sorted = [...filtered];

        switch (sortBy) {
            case 'created_at':
                return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            case 'updated_at':
                return sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            case 'published_at':
                return sorted.sort((a, b) => {
                    if (!a.published_at && !b.published_at) return 0;
                    if (!a.published_at) return 1;
                    if (!b.published_at) return -1;
                    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
                });
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    }, [allPosts, searchQuery]);

    const handleSelectPost = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const handleBack = () => {
        setSelectedPost(null);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} className="p-0">
            <Head title="Blog" />

            {/* Mobile view - show list or detail */}
            <div className={`w-full md:hidden ${selectedPost ? 'hidden' : 'block'}`}>
                <BlogList
                    posts={filteredAndSortedPosts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectPost}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <div className={`w-full md:hidden ${selectedPost ? 'block' : 'hidden'}`}>
                <BlogDetail post={selectedPost} onBack={handleBack} showBackButton />
            </div>

            {/* Desktop view - show both side by side */}
            <div className="border-sidebar-border/70 hidden w-80 shrink-0 border-r md:block">
                <BlogList
                    posts={filteredAndSortedPosts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectPost}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <div className="hidden flex-1 md:block">
                <BlogDetail post={selectedPost} />
            </div>
        </AppLayout>
    );
}
