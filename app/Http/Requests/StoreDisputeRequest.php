<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDisputeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'respondent_agency' => 'required|string|max:255',
            'category' => 'required|in:information_access,information_dispute,objection,other',
            'incident_date' => 'required|date|before_or_equal:today',
            'petitioner_demands' => 'required|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul permohonan harus diisi.',
            'title.max' => 'Judul permohonan maksimal 255 karakter.',
            'description.required' => 'Deskripsi permohonan harus diisi.',
            'respondent_agency.required' => 'Instansi termohon harus diisi.',
            'respondent_agency.max' => 'Nama instansi termohon maksimal 255 karakter.',
            'category.required' => 'Kategori sengketa harus dipilih.',
            'category.in' => 'Kategori sengketa tidak valid.',
            'incident_date.required' => 'Tanggal kejadian harus diisi.',
            'incident_date.date' => 'Format tanggal kejadian tidak valid.',
            'incident_date.before_or_equal' => 'Tanggal kejadian tidak boleh melebihi hari ini.',
            'petitioner_demands.required' => 'Tuntutan pemohon harus diisi.',
        ];
    }
}