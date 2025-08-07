<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDisputeRequest;
use App\Http\Requests\UpdateDisputeRequest;
use App\Models\Dispute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisputeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $disputes = Dispute::with(['petitioner', 'verifiedBy'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('case_number', 'like', "%{$search}%")
                      ->orWhere('title', 'like', "%{$search}%")
                      ->orWhere('respondent_agency', 'like', "%{$search}%")
                      ->orWhereHas('petitioner', function ($pq) use ($search) {
                          $pq->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('disputes/index', [
            'disputes' => $disputes,
            'filters' => $request->only(['search', 'status', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('disputes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDisputeRequest $request)
    {
        $validated = $request->validated();
        $validated['petitioner_id'] = auth()->id();
        $validated['case_number'] = Dispute::generateCaseNumber();
        $validated['submitted_at'] = now();

        $dispute = Dispute::create($validated);

        return redirect()->route('disputes.show', $dispute)
            ->with('success', 'Permohonan sengketa berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dispute $dispute)
    {
        $dispute->load([
            'petitioner', 
            'verifiedBy', 
            'hearings.commissioner', 
            'decision.commissioner',
            'attachments.uploadedBy'
        ]);

        return Inertia::render('disputes/show', [
            'dispute' => $dispute,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dispute $dispute)
    {
        // Only allow editing if dispute is not yet verified
        if ($dispute->status !== 'submitted') {
            return redirect()->route('disputes.show', $dispute)
                ->with('error', 'Permohonan tidak dapat diubah setelah diverifikasi.');
        }

        return Inertia::render('disputes/edit', [
            'dispute' => $dispute,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDisputeRequest $request, Dispute $dispute)
    {
        // Only allow updating if dispute is not yet verified
        if ($dispute->status !== 'submitted') {
            return redirect()->route('disputes.show', $dispute)
                ->with('error', 'Permohonan tidak dapat diubah setelah diverifikasi.');
        }

        $dispute->update($request->validated());

        return redirect()->route('disputes.show', $dispute)
            ->with('success', 'Permohonan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dispute $dispute)
    {
        // Only allow deletion if dispute is not yet verified
        if ($dispute->status !== 'submitted') {
            return redirect()->route('disputes.index')
                ->with('error', 'Permohonan tidak dapat dihapus setelah diverifikasi.');
        }

        $dispute->delete();

        return redirect()->route('disputes.index')
            ->with('success', 'Permohonan berhasil dihapus.');
    }
}