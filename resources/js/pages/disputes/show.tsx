import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Perkara', href: '/disputes' },
    { title: 'Detail Perkara', href: '#' },
];

interface Dispute {
    id: number;
    case_number: string;
    title: string;
    description: string;
    respondent_agency: string;
    status: string;
    category: string;
    incident_date: string;
    petitioner_demands: string;
    created_at: string;
    submitted_at?: string;
    verified_at?: string;
    petitioner: {
        name: string;
        email: string;
    };
    verified_by?: {
        name: string;
    };
    hearings?: Array<{
        id: number;
        scheduled_at: string;
        location: string;
        type: string;
        status: string;
        commissioner?: {
            name: string;
        };
    }>;
    decision?: {
        id: number;
        decision_number: string;
        type: string;
        ruling: string;
        status: string;
        commissioner: {
            name: string;
        };
    };
    attachments?: Array<{
        id: number;
        title: string;
        filename: string;
        type: string;
        file_size: number;
        uploaded_by: {
            name: string;
        };
    }>;
}

interface Props {
    dispute: Dispute;
    [key: string]: unknown;
}

export default function ShowDispute({ dispute }: Props) {
    const getStatusBadge = (status: string) => {
        const statusMap = {
            submitted: { label: 'Diajukan', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
            verified: { label: 'Diverifikasi', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
            scheduled: { label: 'Dijadwalkan', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
            in_progress: { label: 'Berlangsung', class: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
            decided: { label: 'Diputuskan', class: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
            closed: { label: 'Selesai', class: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' },
        };
        return statusMap[status as keyof typeof statusMap] || statusMap.submitted;
    };

    const getCategoryLabel = (category: string) => {
        const categoryMap = {
            information_access: 'Akses Informasi',
            information_dispute: 'Sengketa Informasi',
            objection: 'Keberatan',
            other: 'Lainnya',
        };
        return categoryMap[category as keyof typeof categoryMap] || category;
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title={`Detail Perkara ${dispute.case_number}`} />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            📋 {dispute.case_number}
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            {dispute.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusBadge(dispute.status).class}`}>
                            {getStatusBadge(dispute.status).label}
                        </span>
                        {dispute.status === 'submitted' && (
                            <Link href={route('disputes.edit', dispute.id)}>
                                <Button variant="outline">
                                    ✏️ Edit
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                📄 Informasi Perkara
                            </h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Kategori
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {getCategoryLabel(dispute.category)}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Instansi Termohon
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {dispute.respondent_agency}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal Kejadian
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {new Date(dispute.incident_date).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal Diajukan
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {dispute.submitted_at 
                                            ? new Date(dispute.submitted_at).toLocaleDateString('id-ID')
                                            : new Date(dispute.created_at).toLocaleDateString('id-ID')
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                📝 Uraian Kronologi
                            </h2>
                            <div className="prose max-w-none dark:prose-invert">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {dispute.description}
                                </p>
                            </div>
                        </div>

                        {/* Demands */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                ⚖️ Tuntutan Pemohon
                            </h2>
                            <div className="prose max-w-none dark:prose-invert">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {dispute.petitioner_demands}
                                </p>
                            </div>
                        </div>

                        {/* Hearings */}
                        {dispute.hearings && dispute.hearings.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    🏛️ Jadwal Sidang
                                </h2>
                                <div className="space-y-3">
                                    {dispute.hearings.map((hearing) => (
                                        <div key={hearing.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-600">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                                    Sidang {hearing.type}
                                                </h3>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {hearing.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                📅 {new Date(hearing.scheduled_at).toLocaleDateString('id-ID')} 
                                                🕐 {new Date(hearing.scheduled_at).toLocaleTimeString('id-ID')}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                📍 {hearing.location}
                                            </p>
                                            {hearing.commissioner && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    👨‍⚖️ Komisioner: {hearing.commissioner.name}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Decision */}
                        {dispute.decision && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    📜 Putusan
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nomor Putusan
                                        </label>
                                        <p className="font-mono text-gray-900 dark:text-gray-100">
                                            {dispute.decision.decision_number}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Jenis Putusan
                                        </label>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {dispute.decision.type}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Putusan
                                        </label>
                                        <div className="prose max-w-none dark:prose-invert">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                {dispute.decision.ruling}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Komisioner
                                        </label>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {dispute.decision.commissioner.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Petitioner Info */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                👤 Pemohon
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {dispute.petitioner.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {dispute.petitioner.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Verification Info */}
                        {dispute.verified_by && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    ✅ Verifikasi
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Diverifikasi oleh
                                        </label>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {dispute.verified_by.name}
                                        </p>
                                    </div>
                                    {dispute.verified_at && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Tanggal Verifikasi
                                            </label>
                                            <p className="text-gray-900 dark:text-gray-100">
                                                {new Date(dispute.verified_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Documents */}
                        {dispute.attachments && dispute.attachments.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    📎 Dokumen
                                </h2>
                                <div className="space-y-3">
                                    {dispute.attachments.map((doc) => (
                                        <div key={doc.id} className="border border-gray-200 rounded-lg p-3 dark:border-gray-600">
                                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                                {doc.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {doc.type} • {Math.round(doc.file_size / 1024)} KB
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Diunggah oleh: {doc.uploaded_by.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                🔧 Aksi
                            </h2>
                            <div className="space-y-3">
                                <Link href={route('disputes.index')}>
                                    <Button variant="outline" className="w-full">
                                        🔙 Kembali ke Daftar
                                    </Button>
                                </Link>
                                
                                {dispute.status === 'submitted' && (
                                    <Link href={route('disputes.edit', dispute.id)}>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                            ✏️ Edit Permohonan
                                        </Button>
                                    </Link>
                                )}
                                
                                <Button variant="outline" className="w-full">
                                    📄 Cetak Ringkasan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}