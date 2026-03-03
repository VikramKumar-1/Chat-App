<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('message_status', function (Blueprint $table) {

            $table->id();

            // Which message
            $table->foreignId('message_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Which user this status belongs to
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // sent | delivered | seen
            $table->string('status')->default('sent');

            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('seen_at')->nullable();

            $table->timestamps();

            // Prevent duplicate status per user per message
            $table->unique(['message_id', 'user_id']);

            // Fast lookup for unread / seen queries
            $table->index(['user_id', 'status']);
        });

        // PostgreSQL CHECK constraint
        DB::statement("
            ALTER TABLE message_status
            ADD CONSTRAINT message_status_check
            CHECK (status IN ('sent','delivered','seen'))
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('message_status');
    }
};