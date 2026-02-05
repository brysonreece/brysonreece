import { ChangeEvent, useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    value: string | null;
    onChange: (path: string | null) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;
        // If path is already a full URL, return it
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // Otherwise, construct the storage URL
        return `/storage/blog/posts/${path}`;
    };

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be less than 2MB');
            return;
        }

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to server
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/blog/images', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }

            const data = await response.json();
            onChange(data.path); // Store relative path in MDX
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to upload image');
            setPreviewUrl(null); // Clear preview on error
        } finally {
            setUploading(false);
            if (inputRef.current) {
                inputRef.current.value = ''; // Reset input
            }
        }
    };

    const handleRemove = () => {
        onChange(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const displayUrl = previewUrl || getImageUrl(value);

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {label}
                </label>
            )}

            <div className="relative">
                {displayUrl ? (
                    <div className="relative group">
                        <img
                            src={displayUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-neutral-300 dark:border-neutral-700"
                        />
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                <Loader2 className="size-8 text-white animate-spin" />
                            </div>
                        )}
                        {!uploading && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={handleRemove}
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={uploading}
                        className="w-full h-48 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="size-8 text-neutral-500 animate-spin" />
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="size-8 text-neutral-500" />
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Click to upload image
                                </span>
                                <span className="text-xs text-neutral-500">Max 2MB</span>
                            </>
                        )}
                    </button>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        </div>
    );
}
