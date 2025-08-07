<?php

namespace Tests\Feature;

use App\Models\Dispute;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DisputeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles
        Role::factory()->petitioner()->create();
        Role::factory()->clerk()->create();
        Role::factory()->commissioner()->create();
        Role::factory()->admin()->create();
    }

    public function test_authenticated_user_can_view_disputes_index(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        Dispute::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('disputes.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('disputes/index')
                ->has('disputes.data', 3)
        );
    }

    public function test_authenticated_user_can_view_create_dispute_form(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        $response = $this->actingAs($user)->get(route('disputes.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('disputes/create')
        );
    }

    public function test_authenticated_user_can_create_dispute(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        $disputeData = [
            'title' => 'Sengketa Akses Informasi Anggaran',
            'description' => 'Deskripsi lengkap tentang sengketa yang diajukan',
            'respondent_agency' => 'Dinas Pendidikan DKI Jakarta',
            'category' => 'information_access',
            'incident_date' => '2024-01-15',
            'petitioner_demands' => 'Meminta akses informasi anggaran tahun 2024',
        ];

        $response = $this->actingAs($user)->post(route('disputes.store'), $disputeData);

        $response->assertRedirect();
        $this->assertDatabaseHas('disputes', [
            'title' => $disputeData['title'],
            'petitioner_id' => $user->id,
            'status' => 'submitted',
        ]);
    }

    public function test_dispute_requires_valid_data(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        $response = $this->actingAs($user)->post(route('disputes.store'), []);

        $response->assertSessionHasErrors([
            'title',
            'description',
            'respondent_agency',
            'category',
            'incident_date',
            'petitioner_demands',
        ]);
    }

    public function test_user_can_view_dispute_details(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        $dispute = Dispute::factory()->create(['petitioner_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('disputes.show', $dispute));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('disputes/show')
                ->has('dispute')
                ->where('dispute.id', $dispute->id)
        );
    }

    public function test_guest_cannot_access_disputes(): void
    {
        $response = $this->get(route('disputes.index'));
        $response->assertRedirect(route('login'));

        $response = $this->get(route('disputes.create'));
        $response->assertRedirect(route('login'));

        $response = $this->post(route('disputes.store'), []);
        $response->assertRedirect(route('login'));
    }

    public function test_case_number_is_generated_automatically(): void
    {
        $user = User::factory()->create();
        $petitionerRole = Role::where('name', 'petitioner')->first();
        $user->roles()->attach($petitionerRole);

        $disputeData = [
            'title' => 'Test Dispute',
            'description' => 'Test description',
            'respondent_agency' => 'Test Agency',
            'category' => 'information_access',
            'incident_date' => '2024-01-15',
            'petitioner_demands' => 'Test demands',
        ];

        $response = $this->actingAs($user)->post(route('disputes.store'), $disputeData);

        $dispute = Dispute::where('title', 'Test Dispute')->first();
        $this->assertNotNull($dispute->case_number);
        $this->assertStringStartsWith('KI-DKI/', $dispute->case_number);
    }
}