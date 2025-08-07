import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Persidangan KI DKI Jakarta">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-indigo-200 px-5 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-900/20"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-6xl lg:flex-row lg:gap-12">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-6">
                                <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800 mb-4 dark:bg-indigo-900/30 dark:text-indigo-300">
                                    ⚖️ Sistem Persidangan Digital
                                </div>
                                <h1 className="mb-6 text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
                                    <span className="text-indigo-600">Komisi Informasi</span><br />
                                    Provinsi DKI Jakarta
                                </h1>
                                <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Platform digital untuk mengelola persidangan sengketa informasi publik dengan sistem yang terintegrasi dan transparan.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mb-8 grid gap-4 text-left">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                        <span className="text-green-600 dark:text-green-400">📋</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pengajuan Sengketa Online</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Pemohon dapat mengajukan sengketa baru dan melacak status permohonan secara real-time</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                        <span className="text-blue-600 dark:text-blue-400">📅</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Manajemen Jadwal Sidang</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Panitera dapat mengatur jadwal sidang dan mengelola dokumen kasus dengan efisien</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                                        <span className="text-purple-600 dark:text-purple-400">⚖️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Putusan Digital</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Komisioner dapat mencatat hasil sidang dan mengesahkan putusan secara digital</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
                                        <span className="text-orange-600 dark:text-orange-400">📊</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Laporan & Analytics</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Admin dapat melihat laporan lengkap dan melakukan manajemen sistem</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                {auth.user ? (
                                    <Link
                                        href={route('disputes.index')}
                                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        🏛️ Lihat Daftar Perkara
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            📝 Mulai Ajukan Sengketa
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-lg border-2 border-indigo-600 px-8 py-3 text-base font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                                        >
                                            🔐 Masuk ke Sistem
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Visual Mockup */}
                        <div className="flex-1 mt-12 lg:mt-0">
                            <div className="relative">
                                {/* Main Dashboard Mockup */}
                                <div className="rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Dashboard Persidangan</h3>
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    </div>
                                    
                                    {/* Stats Cards */}
                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                                            <div className="text-sm text-blue-700 dark:text-blue-300">Perkara Aktif</div>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
                                            <div className="text-sm text-green-700 dark:text-green-300">Selesai</div>
                                        </div>
                                    </div>
                                    
                                    {/* Recent Cases */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100">KI-DKI/001/01/2024</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Sengketa Akses Informasi</div>
                                            </div>
                                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                Sidang
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100">KI-DKI/002/01/2024</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Keberatan Informasi</div>
                                            </div>
                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                Verifikasi
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 rounded-lg bg-indigo-600 p-3 shadow-lg">
                                    <span className="text-2xl">⚖️</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 rounded-lg bg-green-600 p-3 shadow-lg">
                                    <span className="text-2xl">✅</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="mb-2">
                        🏛️ Komisi Informasi Provinsi DKI Jakarta
                    </div>
                    <div>
                        Sistem Persidangan Digital untuk Transparansi Informasi Publik
                    </div>
                </footer>
            </div>
        </>
    );
}