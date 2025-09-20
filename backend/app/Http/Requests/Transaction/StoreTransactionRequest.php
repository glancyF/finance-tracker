<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
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
            'type' => ['required','in:income,expense'],
            'amount'=>['required','numeric','gt:0','max:999999999999.99'],
            'date' => ['required','date_format:Y-m-d'],
            'category_id' => ['nullable','integer','exists:categories,id'],
            'category_name' => ['nullable','string','max:64','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u'],
            'comment'       => ['nullable','string','max:255','regex:/^[\p{L}\p{M}\p{N}\s-]+$/u'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
           $cid = $this->input('category_id');
           $cname = $this->input('category_name','');
           if(!$cid && $cname === ""){
               $validator->errors()->add('category', 'Category name cannot be empty.');
           }
        });
    }
}
