<?php

namespace App\Rules\Blog;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Storage;

class UniquePostSlug implements ValidationRule
{
    public function __construct(
        protected ?string $ignoreSlug = null
    ) {}

    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // If we're updating and the slug hasn't changed, it's valid
        if ($this->ignoreSlug !== null && $value === $this->ignoreSlug) {
            return;
        }

        // Check if file exists
        if (Storage::disk('local')->exists('blog/posts/'.$value.'.mdx')) {
            $fail('A post with this slug already exists.');
        }
    }
}
