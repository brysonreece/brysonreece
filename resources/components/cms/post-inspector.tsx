import { MouseEventHandler, useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Loader2, LucideIcon, PencilIcon, Trash2, User } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';

import { PanelButton, PanelControls } from './panel-controls';

import { type Post } from '@/types/cms';
import { Container } from '../ui/container';
import { destroy as destroyPost } from '@/actions/App/Http/Controllers/Blog/PostController';

interface PostInspectorProps {
    post: Post | null;
    onBack: MouseEventHandler<HTMLButtonElement>;
    onEdit: MouseEventHandler<HTMLButtonElement>;
}

export function PostInspector({ post, onBack, onEdit }: PostInspectorProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!post) return;

        if (!confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);

        router.delete(destroyPost({ post: post.id }).url, {
            onSuccess: () => {
                toast.success('Post deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete post');
                setIsDeleting(false);
            },
        });
    };

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
        <div className="h-full divide-y divide-sidebar-border">
            <div className="w-full">
                <PostInspectorControls
                    onBack={onBack}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                />
            </div>

            <div className="w-full">
                <PostInspectorHeader post={post} />
            </div>

            <Container className="p-4 sm:p-6 lg:p-8 max-w-3xl overflow-y-auto">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {post.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={index} className="mt-8! mb-4! text-xl font-bold first:mt-0">
                                    {paragraph.replace('## ', '')}
                                </h2>
                            );
                        }
                        return (
                            <p key={index} className="text-sm leading-6 my-2 first:mt-0">
                                {paragraph}
                            </p>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

interface PostInspectorHeaderProps {
    post: Post;
}

function PostInspectorHeader({ post }: PostInspectorHeaderProps) {
    return (
        <Container className="p-4 sm:p-6 lg:p-8 max-w-3xl flex flex-col">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{post.title}</h1>
            <div className="mt-4 overflow-x-auto [scrollbar-width:none] flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                {post.author && (
                    <PostAttribute value={post.author} icon={User} />
                )}

                {post.published_at && (
                    <PostAttribute
                        value={format(new Date(post.published_at), 'MMMM d, yyyy')}
                        icon={Calendar}
                    />
                )}
            </div>

            {post.tags.length > 0 && (
                <div className="mt-8 w-full overflow-x-auto [scrollbar-width:none] flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {post.tags.map(tag => (
                        <Badge key={tag} className="text-[0.625rem]" variant="secondary">{tag}</Badge>
                    ))}
                </div>
            )}
        </Container>
    );
}

interface PostAttributeProps {
    value: string;
    icon: LucideIcon;
}

function PostAttribute({ value, icon: Icon }: PostAttributeProps) {
    return (
        <div className="flex items-center gap-1.5">
            <Icon className="shrink-0 size-3 mb-px text-neutral-500" />
            <p className="flex-1 truncate text-xs text-neutral-500">{value}</p>
        </div>
    );
}

interface PostInspectorControlsProps {
    onBack: MouseEventHandler<HTMLButtonElement>;
    onEdit: MouseEventHandler<HTMLButtonElement>;
    onDelete: () => void;
    isDeleting: boolean;
}

function PostInspectorControls({ onBack, onEdit, onDelete, isDeleting }: PostInspectorControlsProps) {
    return (
        <PanelControls
            className="border-b-0"
            orientation='horizontal'
            actions={() => (
                <>
                    <PanelButton className="sm:hidden" onClick={onBack}>
                        <ArrowLeft className="size-3 text-neutral-500" />
                    </PanelButton>
                    <div className="flex-1 h-8 px-3 py-2 sm:p-0">
                        <h2 className="sm:hidden text-xs font-medium text-neutral-500">Back to list</h2>
                    </div>
                    <PanelButton onClick={onEdit} disabled={isDeleting}>
                        <PencilIcon className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={onDelete} disabled={isDeleting}>
                        {isDeleting ? (
                            <Loader2 className="size-3 text-neutral-500 animate-spin" />
                        ) : (
                            <Trash2 className="size-3 text-red-500" />
                        )}
                    </PanelButton>
                </>
            )}
        />
    );
}
