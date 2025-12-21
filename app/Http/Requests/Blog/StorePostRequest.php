<?php

namespace App\Http\Requests\Blog;

use App\Rules\Blog\UniquePostSlug;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', new UniquePostSlug],
            'content' => ['required', 'string'],
            'description' => ['nullable', 'string', 'max:500'],
            'published_at' => ['nullable', 'date'],
            'cover_image_url' => ['nullable', 'string', 'max:500'],
            'preview_image_url' => ['nullable', 'string', 'max:500'],
            'author' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
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
