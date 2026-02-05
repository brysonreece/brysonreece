import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
    ArrowLeft,
    Bold,
    Calendar,
    CheckIcon,
    Code,
    EyeIcon,
    Heading1,
    Heading2,
    Heading3,
    Image,
    Italic,
    Link,
    List,
    ListOrdered,
    Loader2,
    Minus,
    Table,
    User,
} from 'lucide-react';
import {
    MDXEditor,
    type MDXEditorMethods,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    tablePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';

import { ImageUpload } from './image-upload';
import { PanelButton, PanelControls } from './panel-controls';

import { type Post } from '@/types/cms';
import { Container } from '../ui/container';
import { cn } from '@/lib/utils';
import { update as updatePost } from '@/actions/App/Http/Controllers/Blog/PostController';

interface PostEditorProps {
    post: Post | null;
    onBack: MouseEventHandler<HTMLButtonElement>;
}

export function PostEditor({ post, onBack }: PostEditorProps) {
    const [isPreview, setIsPreview] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const editorRef = useRef<MDXEditorMethods>(null);
    const isSavingRef = useRef<boolean>(false);

    const form = useForm({
        title: post?.title || '',
        content: post?.content || '',
        description: post?.description || '',
        author: post?.author || '',
        tags: post?.tags || [],
        published_at: post?.published_at || null,
        cover_image_url: post?.cover_image_url || null,
        preview_image_url: post?.preview_image_url || null,
        meta_title: post?.meta_title || null,
        meta_description: post?.meta_description || null,
    });

    // Sync form data when post prop changes
    useEffect(() => {
        if (post) {
            form.setData({
                title: post.title,
                content: post.content,
                description: post.description || '',
                author: post.author || '',
                tags: post.tags,
                published_at: post.published_at,
                cover_image_url: post.cover_image_url,
                preview_image_url: post.preview_image_url,
                meta_title: post.meta_title,
                meta_description: post.meta_description,
            });
            setIsDirty(false);
        }
    }, [post?.id]);

    // Track changes to mark as dirty
    useEffect(() => {
        if (post && form.data.title !== post.title) {
            setIsDirty(true);
        }
    }, [form.data]);

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    // Block Inertia navigation when dirty (but not during save)
    useEffect(() => {
        const removeListener = router.on('before', (event) => {
            if (isDirty && !isSavingRef.current && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
                event.preventDefault();
                return false;
            }
        });

        return removeListener;
    }, [isDirty]);

    const handleSave = () => {
        if (!post) return;

        // Set ref to allow navigation during save
        isSavingRef.current = true;

        form.put(updatePost({ post: post.id }).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Post saved successfully');
                setIsDirty(false);
                isSavingRef.current = false;
            },
            onError: () => {
                toast.error('Failed to save post');
                isSavingRef.current = false;
            },
        });
    };

    const handleFormChange = (updates: Partial<typeof form.data>) => {
        form.setData({ ...form.data, ...updates });
        setIsDirty(true);
    };

    if (!post) {
        return (
            <div className="relative flex w-full h-full items-center justify-center p-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No post selected</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Select a post from the list to edit its content</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col divide-y divide-sidebar-border">
            <div className="w-full">
                <PostEditorControls
                    onBack={onBack}
                    onSave={handleSave}
                    onPreviewToggle={() => setIsPreview(!isPreview)}
                    previewing={isPreview}
                    saving={form.processing}
                    isDirty={isDirty}
                />
            </div>

            <div className="w-full">
                <PostEditorHeader post={post} formData={form.data} onChange={handleFormChange} />
            </div>

            <div className="flex-1 overflow-hidden">
                {isPreview ? (
                    <Container className="p-4 sm:p-6 lg:p-8 max-w-3xl overflow-y-auto h-full">
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {form.data.content.split('\n\n').map((paragraph: string, index: number) => {
                                if (paragraph.startsWith('## ')) {
                                    return (
                                        <h2 key={index} className="mt-8! mb-4! text-xl font-bold first:mt-0">
                                            {paragraph.replace('## ', '')}
                                        </h2>
                                    );
                                }
                                if (paragraph.startsWith('# ')) {
                                    return (
                                        <h1 key={index} className="mt-8! mb-4! text-2xl font-bold first:mt-0">
                                            {paragraph.replace('# ', '')}
                                        </h1>
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
                ) : (
                    <div className="w-full h-full flex flex-col overflow-hidden">
                        <MdxEditorControls editorRef={editorRef} />
                        <Container className="p-4 sm:p-6 lg:p-8 max-w-3xl flex-1 overflow-hidden">
                            <MDXEditor
                                ref={editorRef}
                                markdown={form.data.content}
                                onChange={(content) => handleFormChange({ content })}
                                plugins={[
                                    headingsPlugin(),
                                    listsPlugin(),
                                    quotePlugin(),
                                    thematicBreakPlugin(),
                                    linkPlugin(),
                                    linkDialogPlugin(),
                                    imagePlugin(),
                                    tablePlugin(),
                                    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', tsx: 'TypeScript (JSX)', jsx: 'JavaScript (JSX)', css: 'CSS', html: 'HTML', json: 'JSON', md: 'Markdown', bash: 'Bash', sh: 'Shell', php: 'PHP' } }),
                                    diffSourcePlugin({ viewMode: 'rich-text' }),
                                    markdownShortcutPlugin(),
                                ]}
                                className="dark-theme bg-transparent prose border-0 [&_.mdxeditor-root-contenteditable]:bg-transparent"
                                contentEditableClassName="prose prose-neutral dark:prose-invert max-w-none p-0! prose-headings:mt-8! prose-headings:mb-4! prose-headings:text-xl prose-headings:font-bold prose-headings:first:mt-0 prose-p:text-sm prose-p:leading-6 prose-p:my-2 prose-p:first:mt-0 prose-p:text-[var(--tw-prose-body)]"
                            />
                        </Container>
                    </div>
                )}
            </div>
        </div>
    );
}

interface PostEditorHeaderProps {
    post: Post;
    formData: {
        title: string;
        content: string;
        description: string;
        author: string;
        tags: string[];
        published_at: string | null;
        cover_image_url: string | null;
        preview_image_url: string | null;
        meta_title: string | null;
        meta_description: string | null;
    };
    onChange: (updates: Partial<PostEditorHeaderProps['formData']>) => void;
}

function PostEditorHeader({ post, formData, onChange }: PostEditorHeaderProps) {
    const formatDateTimeLocal = (dateString: string | null): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleDateChange = (value: string) => {
        if (!value) {
            onChange({ published_at: null });
            return;
        }
        const date = new Date(value);
        onChange({ published_at: date.toISOString() });
    };

    return (
        <Container className="p-4 sm:p-6 lg:p-8 max-w-3xl flex flex-col">
            <input
                type="text"
                className="text-xl font-bold bg-transparent rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                value={formData.title}
                onChange={(e) => onChange({ title: e.target.value })}
            />

            <div className="mt-4 overflow-x-auto [scrollbar-width:none] flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                    <User className="shrink-0 size-3 mb-px text-neutral-500" />
                    <input
                        type="text"
                        className="flex-1 text-xs bg-transparent rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                        value={formData.author}
                        onChange={(e) => onChange({ author: e.target.value })}
                    />
                </div>

                <div className="flex items-center gap-1.5">
                    <Calendar className="shrink-0 size-3 mb-px text-neutral-500" />
                    <input
                        type="datetime-local"
                        className="flex-1 text-xs bg-transparent rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                        value={formatDateTimeLocal(formData.published_at)}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                </div>
            </div>

            {post.tags.length > 0 && (
                <div className="mt-8 w-full overflow-x-auto [scrollbar-width:none] flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {post.tags.map(tag => (
                        <Badge key={tag} className="text-[0.625rem]" variant="secondary">{tag}</Badge>
                    ))}
                </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload
                    label="Cover Image"
                    value={formData.cover_image_url}
                    onChange={(path) => onChange({ cover_image_url: path })}
                />
                <ImageUpload
                    label="Preview Image"
                    value={formData.preview_image_url}
                    onChange={(path) => onChange({ preview_image_url: path })}
                />
            </div>
        </Container>
    );
}

interface PostEditorControlsProps {
    onBack: MouseEventHandler<HTMLButtonElement>;
    onSave: MouseEventHandler<HTMLButtonElement>;
    onPreviewToggle: MouseEventHandler<HTMLButtonElement>;
    previewing: boolean;
    saving: boolean;
    isDirty: boolean;
}

function PostEditorControls({ onBack, onSave, onPreviewToggle, previewing, saving, isDirty }: PostEditorControlsProps) {
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
                    <PanelButton onClick={onPreviewToggle}>
                        <EyeIcon className={cn('size-3 text-neutral-500', { 'text-neutral-300': previewing })} />
                    </PanelButton>
                    <PanelButton onClick={onSave} disabled={saving || !isDirty}>
                        {saving ? (
                            <Loader2 className="size-3 text-neutral-500 animate-spin" />
                        ) : (
                            <CheckIcon className={cn('size-3', {
                                'text-neutral-500': isDirty,
                                'text-neutral-300': !isDirty
                            })} />
                        )}
                    </PanelButton>
                </>
            )}
        />
    );
}

interface MdxEditorControlsProps {
    editorRef: React.RefObject<MDXEditorMethods | null>;
}

function MdxEditorControls({ editorRef }: MdxEditorControlsProps) {
    const insertMarkdown = (markdown: string) => {
        if (!editorRef.current) return;

        const currentMarkdown = editorRef.current.getMarkdown();
        editorRef.current.setMarkdown(currentMarkdown + markdown);
        editorRef.current.focus();
    };

    return (
        <PanelControls
            orientation='horizontal'
            actions={() => (
                <>
                    <PanelButton onClick={() => insertMarkdown('**bold**')} title="Bold">
                        <Bold className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('*italic*')} title="Italic">
                        <Italic className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('`code`')} title="Code">
                        <Code className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n# Heading 1\n')} title="Heading 1">
                        <Heading1 className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n## Heading 2\n')} title="Heading 2">
                        <Heading2 className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n### Heading 3\n')} title="Heading 3">
                        <Heading3 className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n- List item\n')} title="Bullet List">
                        <List className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n1. List item\n')} title="Numbered List">
                        <ListOrdered className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('[link text](url)')} title="Insert Link">
                        <Link className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('![alt text](image-url)')} title="Insert Image">
                        <Image className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n')} title="Insert Table">
                        <Table className="size-3 text-neutral-500" />
                    </PanelButton>
                    <PanelButton onClick={() => insertMarkdown('\n---\n')} title="Horizontal Rule">
                        <Minus className="size-3 text-neutral-500" />
                    </PanelButton>
                    <div className="flex-1" />
                </>
            )}
        />
    );
}
