<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;  

class Sale extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'total_amount',
        'discount',
        'paid_amount',
        'status',
        'created_by',
        'bill_header',
        'bill_footer'
    ];

    // enable timestamps so `created_at` is maintained and can be queried
    public $timestamps = true;

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function saleItems()
    {
        return $this->hasMany(Sale_item::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
