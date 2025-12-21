<?php

namespace App\Http\Requests\Blog;

use App\Models\Blog\Post;
use App\Rules\Blog\UniquePostSlug;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $post = Post::find($this->route('post'));
        $currentSlug = $post?->slug;

        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', new UniquePostSlug($currentSlug)],
            'content' => ['sometimes', 'required', 'string'],
            'description' => ['sometimes', 'nullable', 'string', 'max:500'],
            'published_at' => ['sometimes', 'nullable', 'date'],
            'cover_image_url' => ['sometimes', 'nullable', 'string', 'max:500'],
            'preview_image_url' => ['sometimes', 'nullable', 'string', 'max:500'],
            'author' => ['sometimes', 'nullable', 'string', 'max:255'],
            'tags' => ['sometimes', 'nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'meta_title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meta_description' => ['sometimes', 'nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The post title is required.',
            'slug.regex' => 'The slug must be in kebab-case format (lowercase letters, numbers, and hyphens only).',
            'content.required' => 'The post content is required.',
            'tags.array' => 'Tags must be provided as an array.',
        ];
    }
}
