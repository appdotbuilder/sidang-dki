<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Decision
 *
 * @property int $id
 * @property int $dispute_id
 * @property string $decision_number
 * @property string $type
 * @property string $ruling
 * @property string $considerations
 * @property string|null $orders
 * @property \Illuminate\Support\Carbon|null $effective_date
 * @property int $commissioner_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $finalized_at
 * @property array|null $panel_members
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Dispute $dispute
 * @property-read \App\Models\User $commissioner
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Decision newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Decision newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Decision query()
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereCommissionerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereConsiderations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereDecisionNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereDisputeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereEffectiveDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereFinalizedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereOrders($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision wherePanelMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereRuling($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Decision whereUpdatedAt($value)
 * @method static Decision create(array $attributes = [])
 * @method static Decision firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Decision extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'dispute_id',
        'decision_number',
        'type',
        'ruling',
        'considerations',
        'orders',
        'effective_date',
        'commissioner_id',
        'status',
        'finalized_at',
        'panel_members',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'effective_date' => 'date',
        'finalized_at' => 'datetime',
        'panel_members' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the dispute that owns the decision.
     */
    public function dispute(): BelongsTo
    {
        return $this->belongsTo(Dispute::class);
    }

    /**
     * Get the commissioner who made the decision.
     */
    public function commissioner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commissioner_id');
    }

    /**
     * Generate a unique decision number.
     */
    public static function generateDecisionNumber(): string
    {
        $year = date('Y');
        $count = static::whereYear('created_at', $year)->count() + 1;
        
        return sprintf('%03d/PUT-KI-DKI/%s', $count, $year);
    }
}