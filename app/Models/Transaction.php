<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'amount',
        'description',
        'transaction_date',
        'reference_id',
        'created_by'
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
