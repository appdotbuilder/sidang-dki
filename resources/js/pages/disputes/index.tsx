import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Daftar Perkara', href: '/disputes' },
];

interface Dispute {
    id: number;
    case_number: string;
    title: string;
    status: string;
    category: string;
    created_at: string;
    petitioner: {
        name: string;
        email: string;
    };
    verified_by?: {
        name: string;
    };
}

interface Props {
    disputes: {
        data: Dispute[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    filters: {
        search?: string;
        status?: string;
        category?: string;
    };
    [key: string]: unknown;
}

export default function DisputeIndex({ disputes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleFilter = () => {
        router.get(route('disputes.index'), {
            search: search || undefined,
            status: status || undefined,
            category: category || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setCategory('');
        router.get(route('disputes.index'));
    };

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
            <Head title="Daftar Perkara" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Daftar Perkara</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Total {disputes.meta.total} perkara terdaftar
                        </p>
                    </div>
                    <Link href={route('disputes.create')}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            ➕ Ajukan Sengketa Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Pencarian
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nomor perkara, judul, atau pemohon..."
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            >
                                <option value="">Semua Status</option>
                                <option value="submitted">Diajukan</option>
                                <option value="verified">Diverifikasi</option>
                                <option value="scheduled">Dijadwalkan</option>
                                <option value="in_progress">Berlangsung</option>
                                <option value="decided">Diputuskan</option>
                                <option value="closed">Selesai</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kategori
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="information_access">Akses Informasi</option>
                                <option value="information_dispute">Sengketa Informasi</option>
                                <option value="objection">Keberatan</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={handleFilter} className="bg-indigo-600 hover:bg-indigo-700">
                                🔍 Filter
                            </Button>
                            <Button onClick={handleReset} variant="outline">
                                🔄 Reset
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Disputes List */}
                <div className="bg-white rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                    {disputes.data.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                Tidak ada perkara ditemukan
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Belum ada perkara yang sesuai dengan kriteria pencarian Anda.
                            </p>
                            <Link href={route('disputes.create')}>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    ➕ Ajukan Sengketa Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Nomor Perkara
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Judul & Pemohon
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {disputes.data.map((dispute) => (
                                        <tr key={dispute.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {dispute.case_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {dispute.title}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {dispute.petitioner.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900 dark:text-gray-100">
                                                    {getCategoryLabel(dispute.category)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(dispute.status).class}`}>
                                                    {getStatusBadge(dispute.status).label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(dispute.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('disputes.show', dispute.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    👁️ Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {disputes.data.length > 0 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Menampilkan {((disputes.meta.current_page - 1) * disputes.meta.per_page) + 1} sampai {Math.min(disputes.meta.current_page * disputes.meta.per_page, disputes.meta.total)} dari {disputes.meta.total} perkara
                                </div>
                                <div className="flex space-x-1">
                                    {disputes.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}