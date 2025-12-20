import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type BlogPost, type BlogStatusFilter } from '@/types/blog';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';

interface BlogListProps {
    posts: BlogPost[];
    selectedPost: BlogPost | null;
    onSelectPost: (post: BlogPost) => void;
    onBack?: () => void;
    showBackButton?: boolean;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

function getPostStatus(publishedAt: string | null): { color: string; label: string } {
    if (!publishedAt) {
        return { color: 'bg-gray-400', label: 'Draft' };
    }

    const publishDate = new Date(publishedAt);
    const now = new Date();

    if (publishDate > now) {
        return { color: 'bg-yellow-500', label: 'Scheduled' };
    }

    return { color: 'bg-green-500', label: 'Published' };
}

export function getPostStatusType(publishedAt: string | null): BlogStatusFilter {
    if (!publishedAt) {
        return 'draft';
    }

    const publishDate = new Date(publishedAt);
    const now = new Date();

    if (publishDate > now) {
        return 'scheduled';
    }

    return 'published';
}

export function BlogList({
    posts,
    selectedPost,
    onSelectPost,
    onBack,
    showBackButton = false,
    searchQuery = '',
    onSearchChange,
}: BlogListProps) {
    const [showSearchHelp, setShowSearchHelp] = useState(false);

    return (
        <div className="flex h-full flex-col">
            {showBackButton && (
                <div className="border-sidebar-border/70 flex items-center gap-2 border-b px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">Posts</h2>
                </div>
            )}
            {!showBackButton && (
                <div className="border-sidebar-border/70 border-b">
                    <div className="relative flex items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-neutral-500" />
                            <Input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                className="h-8 pl-8 pr-2 rounded-none! border-0 focus-visible:ring-0 text-xs!"
                            />
                        </div>
                        <Popover open={showSearchHelp} onOpenChange={setShowSearchHelp}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-6 shrink-0 m-1 -ml-0.5"
                                    onMouseEnter={() => setShowSearchHelp(true)}
                                    onMouseLeave={() => setShowSearchHelp(false)}
                                >
                                    <HelpCircle className="size-3 text-neutral-500" />
                                    <span className="sr-only">Search help</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-80 mt-4 text-xs"
                                align="end"
                                side="right"
                                sideOffset={8}
                                onMouseEnter={() => setShowSearchHelp(true)}
                                onMouseLeave={() => setShowSearchHelp(false)}
                            >
                                <div className="space-y-4">
                                    <h4 className="text-base font-bold">Search Syntax</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="mb-1.5 font-semibold">Plain text</p>
                                            <p className="text-neutral-600 dark:text-neutral-400">Search in title, excerpt, content, and tags</p>
                                            <code className="mt-1.5 block rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
                                                Laravel
                                            </code>
                                        </div>
                                        <div>
                                            <p className="mb-1.5 font-semibold">Filter by status</p>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                Use <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">published</code>,{' '}
                                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">scheduled</code>, or{' '}
                                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">draft</code>
                                            </p>
                                            <code className="mt-1.5 block rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
                                                f:published f:scheduled
                                            </code>
                                        </div>
                                        <div>
                                            <p className="mb-1.5 font-semibold">Filter by tag</p>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                Use <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">TagName</code>
                                            </p>
                                            <code className="mt-1.5 block rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
                                                t:Laravel t:PHP
                                            </code>
                                        </div>
                                        <div>
                                            <p className="mb-1.5 font-semibold">Sort results</p>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                Use <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">created</code>,{' '}
                                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">updated</code>,{' '}
                                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">published</code>, or{' '}
                                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">title</code>
                                            </p>
                                            <code className="mt-1.5 block rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
                                                s:created
                                            </code>
                                        </div>
                                        <div>
                                            <p className="mb-2 font-semibold">Combine all</p>
                                            <code className="mt-2 block rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
                                                Laravel t:PHP f:published s:created
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            )}
            <div className="flex-1 overflow-y-auto">
                {posts.map((post) => {
                    const status = getPostStatus(post.published_at);
                    return (
                        <button
                            key={post.id}
                            onClick={() => onSelectPost(post)}
                            className={cn(
                                'border-sidebar-border/70 w-full border-b p-4 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900',
                                selectedPost?.id === post.id && 'bg-neutral-100 dark:bg-neutral-800',
                            )}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="line-clamp-1 text-sm font-semibold">{post.title}</h3>
                                        <div className={cn('h-2 w-2 shrink-0 rounded-full', status.color)} title={status.label} aria-label={status.label} />
                                    </div>
                                    <p className="line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                                    <div className="flex items-center gap-2 pt-1">
                                        <Badge variant="secondary" className="text-xs">
                                            {post.category}
                                        </Badge>
                                        <span className="text-xs text-neutral-500">
                                            {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
