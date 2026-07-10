import { format } from 'date-fns';
import { ArrowLeft, Calendar, LucideIcon, PencilIcon, Trash2, User } from 'lucide-react';
import { MouseEventHandler } from 'react';

import { Badge } from '@/components/ui/badge';

import { PanelButton, PanelControls } from './panel-controls';

import { type Post } from '@/types/cms';
import { Container } from '../ui/container';

interface PostInspectorProps {
    post: Post | null;
    onBack: MouseEventHandler<HTMLButtonElement>;
    onEdit: MouseEventHandler<HTMLButtonElement>;
    onDelete: () => void;
}

export function PostInspector({ post, onBack, onEdit, onDelete }: PostInspectorProps) {
    if (!post) {
        return (
            <div className="relative flex h-full w-full items-center justify-center p-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No post selected</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Select a post from the list to view its content</p>
                </div>
            </div>
        );
    }

    return (
        <div className="divide-sidebar-border h-full divide-y">
            <div className="w-full">
                <PostInspectorControls onBack={onBack} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <div className="w-full">
                <PostInspectorHeader post={post} />
            </div>

            <Container className="max-w-3xl overflow-y-auto p-4 sm:p-6 lg:p-8">
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
                            <p key={index} className="my-2 text-sm leading-6 first:mt-0">
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
        <Container className="flex max-w-3xl flex-col p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{post.title}</h1>
            <div className="mt-4 flex [scrollbar-width:none] items-center gap-4 overflow-x-auto text-sm text-neutral-600 dark:text-neutral-400">
                {post.author && <PostAttribute value={post.author} icon={User} />}

                {post.published_at && <PostAttribute value={format(new Date(post.published_at), 'MMMM d, yyyy')} icon={Calendar} />}
            </div>

            {post.tags.length > 0 && (
                <div className="mt-8 flex w-full [scrollbar-width:none] items-center gap-2 overflow-x-auto text-sm text-neutral-600 dark:text-neutral-400">
                    {post.tags.map((tag) => (
                        <Badge key={tag} className="text-[0.625rem]" variant="secondary">
                            {tag}
                        </Badge>
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
            <Icon className="mb-px size-3 shrink-0 text-neutral-500" />
            <p className="flex-1 truncate text-xs text-neutral-500">{value}</p>
        </div>
    );
}

interface PostInspectorControlsProps {
    onBack: MouseEventHandler<HTMLButtonElement>;
    onEdit: MouseEventHandler<HTMLButtonElement>;
    onDelete: () => void;
}

function PostInspectorControls({ onBack, onEdit, onDelete }: PostInspectorControlsProps) {
    return (
        <PanelControls
            className="border-b-0"
            orientation="horizontal"
            actions={() => (
                <>
                    <PanelButton className="sm:hidden" onClick={onBack}>
                        <ArrowLeft className="size-3 text-neutral-500" />
                    </PanelButton>
                    <div className="h-8 flex-1 px-3 py-2 sm:p-0">
                        <h2 className="text-xs font-medium text-neutral-500 sm:hidden">Back to list</h2>
                    </div>
                    <PanelButton onClick={onEdit}>
                        <PencilIcon className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={onDelete}>
                        <Trash2 className="size-3 text-red-500" />
                    </PanelButton>
                </>
            )}
        />
    );
}
