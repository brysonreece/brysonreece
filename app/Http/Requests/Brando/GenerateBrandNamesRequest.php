<?php

namespace App\Http\Requests\Brando;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GenerateBrandNamesRequest extends FormRequest
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
            'description' => ['required', 'string', 'min:10', 'max:2000'],
            'tones' => ['nullable', 'array'],
            'tones.*' => ['string', 'in:BOLD,MINIMAL,PLAYFUL,PRO'],
            'count' => ['nullable', 'integer', 'min:5', 'max:20'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'description.required' => 'A brand description is required.',
            'description.min' => 'Please provide a more detailed brand description (at least 10 characters).',
            'description.max' => 'The brand description may not exceed 2000 characters.',
        ];
    }
}
