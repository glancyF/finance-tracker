<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
class RegisterRequest extends FormRequest
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
            'email' => ['required','email','max:254','min:1','unique:users,email'],
            'password'=> [
                'required','string','confirmed',
                Password::min(8)->max(32)->MixedCase()->numbers()
            ],
        ];
    }
}
