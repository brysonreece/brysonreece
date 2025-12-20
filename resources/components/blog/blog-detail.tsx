import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogDetailProps {
    post: BlogPost | null;
    onBack?: () => void;
    showBackButton?: boolean;
}

export function BlogDetail({ post, onBack, showBackButton = false }: BlogDetailProps) {
    if (!post) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No post selected</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Select a post from the list to view its content</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            {showBackButton && (
                <div className="border-sidebar-border/70 flex items-center gap-2 border-b px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">Back to posts</h2>
                </div>
            )}
            <div className="border-sidebar-border/70 border-b px-6 py-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{post.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <Badge variant="secondary">{post.category}</Badge>
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
