import { Badge } from '@/components/ui/badge';
import { type BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { PostListButton } from './post-list';

interface InspectorProps {
    post: BlogPost | null;
    onBack?: () => void;
    showBackButton?: boolean;
    showExpandButton?: boolean;
}

export function PostInspector({ post, onBack, showBackButton = false }: InspectorProps) {
    if (!post) {
        return (
            <div className="relative flex w-full h-full items-center justify-center p-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No post selected</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Select a post from the list to view its content</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-full flex-col">
            {showBackButton && (
                <div className="flex items-center divide-x divide-sidebar-border border-b">
                    <PostListButton onClick={onBack}>
                        <ArrowLeft className="size-3 text-neutral-500" />
                    </PostListButton>
                    <div className="flex-1 px-4 py-2">
                        <h2 className="text-xs font-medium text-neutral-500">Back to posts</h2>
                    </div>
                </div>
            )}
            <div className="border-sidebar-border/70 flex flex-col border-b px-6 py-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{post.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {post.author && (
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}</span>
                    </div>
                    {post.tags.length > 0 && <Badge variant="secondary">{post.tags[0]}</Badge>}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {post.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={index} className="mt-8 text-xl font-bold first:mt-0">
                                    {paragraph.replace('## ', '')}
                                </h2>
                            );
                        }
                        return (
                            <p key={index} className="mt-4 leading-7 first:mt-0">
                                {paragraph}
                            </p>
                        );
                    })}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
