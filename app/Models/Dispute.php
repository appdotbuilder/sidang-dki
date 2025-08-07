<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Dispute
 *
 * @property int $id
 * @property string $case_number
 * @property string $title
 * @property string $description
 * @property int $petitioner_id
 * @property string $respondent_agency
 * @property string $status
 * @property string $category
 * @property \Illuminate\Support\Carbon|null $incident_date
 * @property string|null $petitioner_demands
 * @property array|null $documents
 * @property \Illuminate\Support\Carbon|null $submitted_at
 * @property \Illuminate\Support\Carbon|null $verified_at
 * @property int|null $verified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $petitioner
 * @property-read \App\Models\User|null $verifiedBy
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Hearing> $hearings
 * @property-read int|null $hearings_count
 * @property-read \App\Models\Decision|null $decision
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Document> $attachments
 * @property-read int|null $attachments_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute query()
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereCaseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereDocuments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereIncidentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute wherePetitionerDemands($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute wherePetitionerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereRespondentAgency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Dispute whereVerifiedBy($value)
 * @method static Dispute create(array $attributes = [])
 * @method static Dispute firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Dispute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'case_number',
        'title',
        'description',
        'petitioner_id',
        'respondent_agency',
        'status',
        'category',
        'incident_date',
        'petitioner_demands',
        'documents',
        'submitted_at',
        'verified_at',
        'verified_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'incident_date' => 'date',
        'submitted_at' => 'datetime',
        'verified_at' => 'datetime',
        'documents' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the petitioner that owns the dispute.
     */
    public function petitioner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'petitioner_id');
    }

    /**
     * Get the user who verified the dispute.
     */
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Get the hearings for the dispute.
     */
    public function hearings(): HasMany
    {
        return $this->hasMany(Hearing::class);
    }

    /**
     * Get the decision for the dispute.
     */
    public function decision(): HasOne
    {
        return $this->hasOne(Decision::class);
    }

    /**
     * Get the documents for the dispute.
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Generate a unique case number.
     */
    public static function generateCaseNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $count = static::whereYear('created_at', $year)->count() + 1;
        
        return sprintf('KI-DKI/%03d/%s/%s', $count, $month, $year);
    }
}