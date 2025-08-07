<?php

use App\Http\Controllers\DisputeController;
use App\Models\Dispute;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user()->load('roles');
        $userRole = $user->roles->first()?->name;
        
        // Get stats based on user role
        $stats = [
            'total_disputes' => Dispute::count(),
            'pending_disputes' => Dispute::where('status', 'submitted')->count(),
            'scheduled_hearings' => 0, // TODO: Implement hearings count
            'completed_disputes' => Dispute::where('status', 'closed')->count(),
        ];
        
        // Get recent disputes based on role
        $recentDisputesQuery = Dispute::with(['petitioner'])
            ->latest()
            ->limit(5);
            
        if ($userRole === 'petitioner') {
            $recentDisputesQuery->where('petitioner_id', auth()->id());
        }
        
        $recentDisputes = $recentDisputesQuery->get();
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_disputes' => $recentDisputes,
            'user_role' => $userRole,
        ]);
    })->name('dashboard');

    // Dispute routes
    Route::resource('disputes', DisputeController::class);
    
    // Placeholder routes for other features
    Route::get('hearings', function () {
        return Inertia::render('hearings/index');
    })->name('hearings.index');
    
    Route::get('hearings/create', function () {
        return Inertia::render('hearings/create');
    })->name('hearings.create');
    
    Route::get('admin/users', function () {
        return Inertia::render('admin/users');
    })->name('admin.users');
    
    Route::get('admin/reports', function () {
        return Inertia::render('admin/reports');
    })->name('admin.reports');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
