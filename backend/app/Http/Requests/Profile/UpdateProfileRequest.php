<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string','min:3','max:16','regex:/^\p{L}+$/u'],
            'email' => ['required', 'email','min:1','max:254', Rule::unique('users','email')->ignore($this->user()->id)],
            'default_currency' => ['required','string','size:3', Rule::in(config('currencies.supported'))],
        ];
    }
}
