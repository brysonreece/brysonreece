import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { destroy as destroyPost } from '@/actions/App/Http/Controllers/Blog/PostController';
import { usePanelCallbackRef } from 'react-resizable-panels';

import { matchesSearchText, parseSearchQuery } from '@/lib/blog/search-parser';

import AppLayout from '@/layouts/app-layout';

import { PostCreateDialog } from '@/components/cms/post-create-dialog';
import { PostEditor } from '@/components/cms/post-editor';
import { PostInspector } from '@/components/cms/post-inspector';
import { PostList } from '@/components/cms/post-list';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { type BreadcrumbItem } from '@/types';
import { type BlogPost } from '@/types/blog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/blog/posts',
    },
];

interface PostsProps {
    posts: {
        data: BlogPost[];
        meta: {
            total: number;
        };
    };
    filters: {
        status?: string;
        search?: string;
        tags?: string | string[];
        sort_by: string;
        sort_order: string;
    };
}

export default function Posts({ posts }: PostsProps) {
    // HACK: this is a workaround for a potential race condition in the react-resizable-panels library
    const [initialListRender, setInitialListRender] = useState<boolean>(true);

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();

    const [listRef, setListRef] = usePanelCallbackRef();

    const allPosts = posts.data;

    const [optimisticPosts, addOptimisticPost] = useOptimistic(
        allPosts,
        (current, id: string) => current.filter((p) => p.id !== id),
    );

    const filteredAndSortedPosts = useMemo(() => {
        const { searchText, filters, tags, sortBy } = parseSearchQuery(searchQuery);

        // First, filter by status, tags, and search text
        const filtered = optimisticPosts.filter((post) => {
            const matchesStatus = filters.includes(post.status);
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
    }, [optimisticPosts, searchQuery]);

    const handleSelectPost = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const handleDelete = (post: BlogPost) => {
        if (!confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
            return;
        }

        addOptimisticPost(post.id);
        setSelectedPost(null);

        router.delete(destroyPost({ post: post.id }).url, {
            onSuccess: () => toast.success('Post deleted successfully'),
            onError: () => toast.error('Failed to delete post'),
        });
    };

    const handleSearchChange = (query: string) => {
        startTransition(() => setSearchQuery(query));
    };

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    const handleNewPost = () => {
        setShowCreateDialog(true);
    };

    const handleCreateSuccess = (post: BlogPost) => {
        setSelectedPost(post);
        setEditMode(true);
    };

    useEffect(() => {
        // Reset selected post when posts list changes
        setSelectedPost(null);
    }, [allPosts]);

    useEffect(() => {
        if (! listRef) return;

        if (initialListRender) {
            setInitialListRender(false);
            return;
        }

        if (collapsed) {
            listRef.collapse();
        } else {
            listRef.expand();
        }
    }, [listRef, collapsed, initialListRender]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} className="p-0">
            <Head title="Posts" />

            <PostCreateDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSuccess={handleCreateSuccess}
            />

            {/* Mobile view - show list or detail */}
            <div className={`w-full sm:hidden ${selectedPost ? 'hidden' : 'block'} ${isPending ? 'opacity-50' : ''} transition-opacity`}>
                <PostList
                    collapsed={false}
                    posts={filteredAndSortedPosts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectPost}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onNewPost={handleNewPost}
                />
            </div>

            <div className={`w-full sm:hidden ${selectedPost ? 'block' : 'hidden'}`}>
                {editMode ? (
                    <PostEditor
                        post={selectedPost}
                        onBack={() => setSelectedPost(null)}
                    />
                ) : (
                    <PostInspector
                        post={selectedPost}
                        onBack={() => setSelectedPost(null)}
                        onEdit={() => setEditMode(true)}
                        onDelete={() => selectedPost && handleDelete(selectedPost)}
                    />
                )}
            </div>

            {/* Desktop view - show both side by side with resizable panels */}
            <div className='w-full hidden sm:flex'>
                <ResizablePanelGroup orientation="horizontal" className="w-full">
                    <ResizablePanel
                        panelRef={setListRef}
                        collapsible
                        className={`border-r border-sidebar-border ${isPending ? 'opacity-50' : ''} transition-opacity`}
                        collapsedSize='32px'
                        defaultSize='300px'
                        minSize='200px'
                        maxSize='400px'
                        onResize={() => {
                            if (! listRef) return;

                            const panelState = listRef.isCollapsed();

                            if (panelState === collapsed) return;

                            setCollapsed(panelState);
                        }}
                    >
                        <PostList
                            posts={filteredAndSortedPosts}
                            selectedPost={selectedPost}
                            onSelectPost={handleSelectPost}
                            collapsed={collapsed}
                            onCollapseToggle={handleCollapseToggle}
                            searchQuery={searchQuery}
                            onSearchChange={handleSearchChange}
                            onNewPost={handleNewPost}
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0" onDoubleClick={() => {
                        if (! listRef) return;

                        if (listRef.getSize().inPixels > 300) {
                            listRef.resize(300);
                        } else if (! collapsed) {
                            setCollapsed(true);
                        } else {
                            setCollapsed(false);
                            listRef.resize(300);
                        }
                    }} />
                    <ResizablePanel>
                        {editMode ? (
                            <PostEditor
                                post={selectedPost}
                                onBack={() => setSelectedPost(null)}
                            />
                        ) : (
                            <PostInspector
                                post={selectedPost}
                                onBack={() => setSelectedPost(null)}
                                onEdit={() => setEditMode(true)}
                                onDelete={() => selectedPost && handleDelete(selectedPost)}
                            />
                        )}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </AppLayout>
    );
}
