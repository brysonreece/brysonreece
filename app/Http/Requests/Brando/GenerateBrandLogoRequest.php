<?php

namespace App\Http\Requests\Brando;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GenerateBrandLogoRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'tagline' => ['nullable', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:2000'],
            'count' => ['required', 'integer', 'min:1', 'max:5'],
            'styles' => ['nullable', 'array'],
            'styles.*' => ['string', 'in:BOLD,MINIMAL,PLAYFUL,ELEGANT'],
            'quality' => ['nullable', 'string', 'in:low,medium,high'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A brand name is required.',
            'name.max' => 'The brand name may not exceed 100 characters.',
            'count.required' => 'At least one logo must be requested.',
            'count.min' => 'At least one logo must be requested.',
            'count.max' => 'A maximum of 5 logos may be requested at once.',
        ];
    }
}
