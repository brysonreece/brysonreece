import { FormEventHandler, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { store as storePost } from '@/actions/App/Http/Controllers/Blog/PostController';

interface PostCreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (post: any) => void;
}

export function PostCreateDialog({ open, onOpenChange, onSuccess }: PostCreateDialogProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [autoSlug, setAutoSlug] = useState(true);

    const form = useForm({
        title: '',
        slug: '',
        content: '# New Post\n\nStart writing your post here...',
        description: '',
        author: '',
        tags: [],
        published_at: null,
        cover_image_url: null,
        preview_image_url: null,
        meta_title: null,
        meta_description: null,
    });

    const generateSlug = (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (autoSlug) {
            setSlug(generateSlug(value));
        }
    };

    const handleSlugChange = (value: string) => {
        setSlug(value);
        setAutoSlug(false);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!slug.trim()) {
            toast.error('Slug is required');
            return;
        }

        // Validate slug format (kebab-case)
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
            toast.error('Slug must be in kebab-case format (lowercase letters, numbers, and hyphens only)');
            return;
        }

        // Use router.post with explicit data instead of form.post
        router.post(storePost().url, {
            ...form.data,
            title,
            slug,
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success('Post created successfully');
                onOpenChange(false);
                setTitle('');
                setSlug('');
                setAutoSlug(true);
                form.reset();

                if (onSuccess && page.props.post) {
                    onSuccess(page.props.post);
                }
            },
            onError: (errors) => {
                if (errors.slug) {
                    toast.error(errors.slug);
                } else if (errors.title) {
                    toast.error(errors.title);
                } else {
                    toast.error('Failed to create post');
                }
            },
        });
    };

    const handleCancel = () => {
        onOpenChange(false);
        setTitle('');
        setSlug('');
        setAutoSlug(true);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <DialogDescription>
                            Enter a title and slug for your new blog post. The slug will be used in the URL.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="My Awesome Post"
                                autoFocus
                                disabled={form.processing}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                placeholder="my-awesome-post"
                                disabled={form.processing}
                            />
                            <p className="text-xs text-neutral-500">
                                {autoSlug ? 'Auto-generated from title' : 'Custom slug'}
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={form.processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Creating...' : 'Create Post'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
