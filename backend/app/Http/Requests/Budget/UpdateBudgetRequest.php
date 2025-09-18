<?php

namespace App\Http\Requests\Budget;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('budget'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required','string','max:64','min:1','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u']
        ];
    }
    public function messages(): array {
        return [
            'name.required' => 'Required',
            'name.string' => 'Name must be string',
            'name.max' => 'Name cannot be longer than 64 characters',
            'name.regex' => 'Invalid symbols'
        ];
    }
}
