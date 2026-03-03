<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->string('avatar')->nullable()->after('password');

            $table->text('bio')->nullable()->after('avatar');

            $table->boolean('show_online_status')
                  ->default(true)
                  ->after('last_seen');

            $table->boolean('show_last_seen')
                  ->default(true)
                  ->after('show_online_status');

            $table->enum('theme', ['light', 'dark'])
                  ->default('light')
                  ->after('show_last_seen');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn([
                'avatar',
                'bio',
                'show_online_status',
                'show_last_seen',
                'theme'
            ]);
        });
    }
};