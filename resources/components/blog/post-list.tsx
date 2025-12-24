import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type BlogPost, type BlogStatusFilter } from '@/types/blog';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeftFromLine, ArrowRightFromLine, HelpCircle, Search } from 'lucide-react';
import { ComponentProps, MouseEventHandler, useState } from 'react';

interface PostListProps {
    posts: BlogPost[];
    selectedPost: BlogPost | null;
    onSelectPost: (post: BlogPost) => void;
    collapsed: boolean;
    onCollapseToggle?: MouseEventHandler<HTMLButtonElement>;
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

function SearchHelpPopover() {
    const [showSearchHelp, setShowSearchHelp] = useState(false);

    return (
        <Popover open={showSearchHelp} onOpenChange={setShowSearchHelp}>
            <PopoverTrigger asChild>
                <PostListButton
                    onMouseEnter={() => setShowSearchHelp(true)}
                    onMouseLeave={() => setShowSearchHelp(false)}
                >
                    <HelpCircle className="size-3 text-neutral-500" />
                    <span className="sr-only">Search help</span>
                </PostListButton>
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
    );
}

export function PostListButton({ children, className, ...props }: ComponentProps<typeof Button>) {
    return (
        <div
            className={cn('shrink-0 flex items-center justify-center w-8 focus:ring-0', className)}
        >
            <Button
                variant="ghost"
                size="icon"
                className={cn('size-8 rounded-none', className)}
                {...props}
            >
                {children}
            </Button>
        </div>
    );
}

export function PostList({
    posts,
    selectedPost,
    onSelectPost,
    collapsed,
    onCollapseToggle,
    searchQuery = '',
    onSearchChange,
}: PostListProps) {
    return (
        <div className={cn('flex h-full flex-col divide-y divide-sidebar-border', collapsed ? 'w-8' : 'w-full')}>
            {collapsed ? (
                <>
                    {onCollapseToggle && (
                        <PostListButton onClick={onCollapseToggle}>
                            <ArrowRightFromLine className="size-3 text-neutral-500" />
                            <span className="sr-only">Expand posts list</span>
                        </PostListButton>
                    )}
                    <PostListButton onClick={(e) => {
                        const searchInput = document.getElementById('post-search');

                        if (searchInput) {
                            onCollapseToggle?.(e);
                            (searchInput as HTMLInputElement).focus();
                        }
                    }}>
                        <Search className="size-3 text-neutral-500" />
                        <span className="sr-only">Focus search input</span>
                    </PostListButton>
                </>
            ) : (
                <div className="flex items-center divide-x divide-sidebar-border">
                    <div className='flex-1'>
                        <Input
                            id="post-search"
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="h-8 rounded-none! border-0 focus-visible:ring-0 text-xs!"
                        />
                    </div>

                    <SearchHelpPopover />

                    {onCollapseToggle && (
                        <PostListButton onClick={onCollapseToggle}>
                            <ArrowLeftFromLine className="size-3 text-neutral-500" />
                            <span className="sr-only">Collapse posts list</span>
                        </PostListButton>
                    )}
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
                                'text-left border-sidebar-border/70 w-full border-b transition-colors hover:bg-accent hover:text-accent-foreground',
                                collapsed ? 'w-auto' : 'w-full p-4',
                                selectedPost?.id === post.id && 'bg-neutral-100 dark:bg-neutral-800',
                            )}
                        >
                            {collapsed ? (
                                <div className="flex flex-col items-center justify-center size-8">
                                    <div className={cn('h-2 w-2 shrink-0 rounded-full', status.color)} title={status.label} aria-label={status.label} />
                                    <span className="sr-only">{post.title}</span>
                                </div>
                            ) : (
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="line-clamp-1 text-sm font-semibold">{post.title}</h3>
                                            <div className={cn('h-2 w-2 shrink-0 rounded-full', status.color)} title={status.label} aria-label={status.label} />
                                        </div>
                                        <p className="line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">{post.description}</p>
                                        <div className="flex items-end justify-end gap-4 mt-4">
                                            {post.tags.length > 0 && (
                                                <div className="flex-1 w-0 overflow-x-clip flex items-center gap-2 -mb-0.5">
                                                    <Badge variant="secondary" className="text-[0.625rem] leading-tight">
                                                        {post.tags[0]}
                                                    </Badge>

                                                    {post.tags.length > 1 && (
                                                        <span className="text-neutral-500  text-[0.625rem] leading-tight truncate">
                                                            + {post.tags.length - 1} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <span className="shrink-0 text-neutral-500 text-[0.625rem] leading-tight">
                                                {formatDistanceToNow(new Date(post.published_at || post.created_at), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
