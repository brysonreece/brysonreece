<?php

namespace App\Http\Requests\Pomelo;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GenerateImageVariationsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
            'prompt' => ['nullable', 'string', 'max:1000'],
            'count' => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'image.required' => 'A product image is required.',
            'image.max' => 'The image must not exceed 10MB.',
            'count.min' => 'At least one variation must be requested.',
            'count.max' => 'A maximum of 5 variations may be requested at once.',
        ];
    }
}
