<?php

namespace App\Modules\Administration\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // L'autorisation est déjà gérée par le middleware Spatie dans les routes
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $roomId = $this->route('room') ? $this->route('room') : null;

        return [
            'name' => 'required|string|max:255|unique:rooms,name,' . $roomId,
            'capacity' => 'required|integer|min:1',
            'building' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Obtenir les messages d'erreur personnalisés.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Le nom de la salle est obligatoire.',
            'name.unique' => 'Ce nom de salle existe déjà.',
            'capacity.required' => 'La capacité de la salle est obligatoire.',
            'capacity.min' => 'La capacité doit être au moins de 1.',
        ];
    }
}
