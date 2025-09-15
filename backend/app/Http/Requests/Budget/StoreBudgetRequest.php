<?php

namespace App\Http\Requests\Budget;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBudgetRequest extends FormRequest
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
            'name' => ['required','string','max:64','min:1','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u'],
            'amount' => ['required','numeric','min:0'],
            'currency' => ['required','string','min:3',Rule::in(['USD','EUR','RUB','CZK'])],
        ];
    }


    public function messages(): array
    {
        return ['name.regex' => 'Invalid symbols'];
    }
}
