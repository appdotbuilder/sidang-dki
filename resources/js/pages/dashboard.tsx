import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats: {
        total_disputes: number;
        pending_disputes: number;
        scheduled_hearings: number;
        completed_disputes: number;
    };
    recent_disputes?: Array<{
        id: number;
        case_number: string;
        title: string;
        status: string;
        created_at: string;
        petitioner: {
            name: string;
        };
    }>;
    user_role?: string;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recent_disputes = [], user_role }: Props) {
    const { auth } = usePage<SharedData>().props;

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

    const getRoleDashboard = () => {
        switch (user_role) {
            case 'petitioner':
                return (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📋 Permohonan Saya</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('disputes.create')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    ➕ Ajukan Sengketa Baru
                                </Link>
                                <Link
                                    href={route('disputes.index')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    📊 Lihat Semua Permohonan
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">📈 Status Permohonan</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.pending_disputes}</div>
                                    <div className="text-sm text-blue-700 dark:text-blue-300">Menunggu</div>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed_disputes}</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">Selesai</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'clerk':
                return (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📅 Tugas Panitera</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('disputes.index')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    ✅ Verifikasi Permohonan
                                </Link>
                                <Link
                                    href={route('hearings.create')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    📅 Jadwalkan Sidang
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">📊 Statistik</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending_disputes}</div>
                                    <div className="text-sm text-yellow-700 dark:text-yellow-300">Perlu Verifikasi</div>
                                </div>
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.scheduled_hearings}</div>
                                    <div className="text-sm text-blue-700 dark:text-blue-300">Sidang Terjadwal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'commissioner':
                return (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">⚖️ Tugas Komisioner</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('disputes.index')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    📋 Daftar Kasus
                                </Link>
                                <Link
                                    href={route('hearings.index')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    🏛️ Jadwal Sidang
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">📊 Kasus Saya</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.scheduled_hearings}</div>
                                    <div className="text-sm text-purple-700 dark:text-purple-300">Sidang Hari Ini</div>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed_disputes}</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">Putusan Dibuat</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'admin':
                return (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">🔧 Administrasi</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('admin.users')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    👥 Manajemen Pengguna
                                </Link>
                                <Link
                                    href={route('admin.reports')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    📊 Laporan Sistem
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">📈 Statistik Sistem</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total_disputes}</div>
                                    <div className="text-sm text-blue-700 dark:text-blue-300">Total Perkara</div>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed_disputes}</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">Selesai</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">🏛️ Selamat Datang</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Sistem Persidangan Komisi Informasi Provinsi DKI Jakarta
                        </p>
                        <div className="mt-4">
                            <Link
                                href={route('disputes.index')}
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            >
                                📋 Lihat Daftar Perkara
                            </Link>
                        </div>
                    </div>
                );
        }
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        🏛️ Selamat Datang, {auth.user?.name}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Sistem Persidangan Digital Komisi Informasi Provinsi DKI Jakarta
                    </p>
                </div>

                {/* Role-specific Dashboard */}
                <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                    {getRoleDashboard()}
                </div>

                {/* Recent Disputes */}
                {recent_disputes.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📋 Perkara Terbaru</h2>
                            <Link
                                href={route('disputes.index')}
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_disputes.map((dispute) => (
                                <div
                                    key={dispute.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                                >
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {dispute.case_number}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {dispute.title}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-500">
                                            Pemohon: {dispute.petitioner.name}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(dispute.status).class}`}>
                                            {getStatusBadge(dispute.status).label}
                                        </span>
                                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            {new Date(dispute.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}