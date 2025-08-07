<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Hearing
 *
 * @property int $id
 * @property int $dispute_id
 * @property \Illuminate\Support\Carbon $scheduled_at
 * @property string $location
 * @property string $type
 * @property string $status
 * @property string|null $agenda
 * @property string|null $notes
 * @property array|null $attendees
 * @property int|null $scheduled_by
 * @property int|null $commissioner_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Dispute $dispute
 * @property-read \App\Models\User|null $scheduledBy
 * @property-read \App\Models\User|null $commissioner
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing query()
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereAgenda($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereAttendees($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereCommissionerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereDisputeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereScheduledBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Hearing whereUpdatedAt($value)
 * @method static Hearing create(array $attributes = [])
 * @method static Hearing firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Hearing extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'dispute_id',
        'scheduled_at',
        'location',
        'type',
        'status',
        'agenda',
        'notes',
        'attendees',
        'scheduled_by',
        'commissioner_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'attendees' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the dispute that owns the hearing.
     */
    public function dispute(): BelongsTo
    {
        return $this->belongsTo(Dispute::class);
    }

    /**
     * Get the user who scheduled the hearing.
     */
    public function scheduledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'scheduled_by');
    }

    /**
     * Get the commissioner assigned to the hearing.
     */
    public function commissioner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commissioner_id');
    }
}