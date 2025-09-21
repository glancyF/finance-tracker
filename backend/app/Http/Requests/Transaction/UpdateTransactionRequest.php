<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
            'type'          => ['sometimes','required','in:income,expense'],
            'amount'        => ['sometimes','required','numeric','gt:0','max:999999999999.99'],
            'date'          => ['sometimes','required','date_format:Y-m-d'],
            'category_id'   => ['nullable','integer','exists:categories,id'],
            'category_name' => ['nullable','string','max:32','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u'],
            'comment'       => ['nullable','string','max:255','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u'],
        ];
    }
}
