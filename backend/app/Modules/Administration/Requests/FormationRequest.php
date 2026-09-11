<?php

namespace App\Modules\Administration\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $formationId = $this->route('formation') ? $this->route('formation') : null;

        return [
            'code' => 'required|string|max:50|unique:formations,code,' . $formationId,
            'name' => 'nullable|string|max:255',
            'level' => 'nullable|string|in:Licence,Master',
            'department' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'code.required' => 'Le code de la formation est obligatoire.',
            'code.unique' => 'Ce code de formation est déjà utilisé.',
            'level.in' => 'Le niveau doit être Licence ou Master.',
        ];
    }
}
