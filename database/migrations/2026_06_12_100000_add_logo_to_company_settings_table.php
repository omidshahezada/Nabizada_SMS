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
        if (Schema::hasTable('company_settings') && !Schema::hasColumn('company_settings', 'logo_path')) {
            Schema::table('company_settings', function (Blueprint $table) {
                $table->string('logo_path')->nullable()->after('phone');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('company_settings') && Schema::hasColumn('company_settings', 'logo_path')) {
            Schema::table('company_settings', function (Blueprint $table) {
                $table->dropColumn('logo_path');
            });
        }
    }
};
