<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            if (!Schema::hasColumn('sales', 'bill_header')) {
                $table->text('bill_header')->nullable()->after('status');
            }
            if (!Schema::hasColumn('sales', 'bill_footer')) {
                $table->text('bill_footer')->nullable()->after('bill_header');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            if (Schema::hasColumn('sales', 'bill_footer')) {
                $table->dropColumn('bill_footer');
            }
            if (Schema::hasColumn('sales', 'bill_header')) {
                $table->dropColumn('bill_header');
            }
        });
    }
};
