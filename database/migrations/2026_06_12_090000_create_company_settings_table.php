<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->text('bill_header')->nullable();
            $table->text('bill_footer')->nullable();
            $table->timestamps();
        });

        // insert default row
        DB::table('company_settings')->insert([
            'company_name' => 'نام شرکت شما',
            'address' => '',
            'phone' => '',
            'bill_header' => '<div><strong>سربرگ پیش‌فرض شرکت</strong></div>',
            'bill_footer' => '<div class="text-muted">پابرگ پیش‌فرض شرکت</div>',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_settings');
    }
};
