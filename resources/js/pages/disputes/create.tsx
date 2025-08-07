import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Perkara', href: '/disputes' },
    { title: 'Ajukan Sengketa', href: '/disputes/create' },
];

export default function CreateDispute() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        respondent_agency: '',
        category: '',
        incident_date: '',
        petitioner_demands: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('disputes.store'));
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Ajukan Sengketa Baru" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">📝 Ajukan Sengketa Baru</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Lengkapi formulir di bawah ini untuk mengajukan sengketa informasi publik
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Judul Permohonan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                placeholder="Contoh: Sengketa Penolakan Akses Informasi Anggaran Dinas XYZ"
                            />
                            <InputError message={errors.title} />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kategori Sengketa <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            >
                                <option value="">Pilih kategori sengketa</option>
                                <option value="information_access">Akses Informasi</option>
                                <option value="information_dispute">Sengketa Informasi</option>
                                <option value="objection">Keberatan</option>
                                <option value="other">Lainnya</option>
                            </select>
                            <InputError message={errors.category} />
                        </div>

                        {/* Respondent Agency */}
                        <div>
                            <label htmlFor="respondent_agency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Instansi Termohon <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="respondent_agency"
                                value={data.respondent_agency}
                                onChange={(e) => setData('respondent_agency', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                placeholder="Contoh: Dinas Pendidikan Provinsi DKI Jakarta"
                            />
                            <InputError message={errors.respondent_agency} />
                        </div>

                        {/* Incident Date */}
                        <div>
                            <label htmlFor="incident_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tanggal Kejadian <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="incident_date"
                                value={data.incident_date}
                                onChange={(e) => setData('incident_date', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                            <InputError message={errors.incident_date} />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Tanggal kejadian yang menjadi dasar permohonan sengketa
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Uraian Kronologi <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                rows={6}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                placeholder="Jelaskan secara detail kronologi kejadian yang menjadi dasar permohonan sengketa..."
                            />
                            <InputError message={errors.description} />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Jelaskan kronologi kejadian secara lengkap dan jelas
                            </p>
                        </div>

                        {/* Petitioner Demands */}
                        <div>
                            <label htmlFor="petitioner_demands" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tuntutan Pemohon <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="petitioner_demands"
                                rows={4}
                                value={data.petitioner_demands}
                                onChange={(e) => setData('petitioner_demands', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                placeholder="Sebutkan dengan jelas apa yang Anda tuntut atau harapkan dari permohonan ini..."
                            />
                            <InputError message={errors.petitioner_demands} />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Uraikan dengan jelas apa yang Anda tuntut atau harapkan
                            </p>
                        </div>

                        {/* Information Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <span className="text-blue-400 text-xl">ℹ️</span>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                        Informasi Penting
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Pastikan semua data yang Anda masukkan sudah benar dan lengkap</li>
                                            <li>Setelah diajukan, permohonan akan diverifikasi oleh panitera</li>
                                            <li>Anda akan mendapat notifikasi status melalui email yang terdaftar</li>
                                            <li>Dokumen pendukung dapat diunggah setelah permohonan disimpan</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                🔙 Kembali
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {processing ? (
                                    <>⏳ Menyimpan...</>
                                ) : (
                                    <>📝 Ajukan Permohonan</>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="bg-gray-50 rounded-lg p-6 dark:bg-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        💡 Butuh Bantuan?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">📞 Kontak</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Telepon: (021) 123-4567<br />
                                Email: info@ki-dki.go.id
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">🏢 Alamat</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Gedung Komisi Informasi DKI Jakarta<br />
                                Jl. Medan Merdeka Selatan No. 8-9, Jakarta Pusat
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}