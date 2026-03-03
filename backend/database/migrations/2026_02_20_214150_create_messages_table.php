<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {

            $table->id();

            // Which conversation this message belongs to
            $table->foreignId('conversation_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Who sent the message
            $table->foreignId('sender_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            // Message type (Postgres safe: string + CHECK constraint)
            $table->string('type')->default('text');

            // Actual content (text or external URL)
            $table->text('content')->nullable();

            // Reply support
            $table->foreignId('reply_to')
                  ->nullable()
                  ->constrained('messages')
                  ->nullOnDelete();

            // For AI generated messages (future)
            $table->boolean('ai_generated')->default(false);

            $table->timestamps();
            $table->softDeletes();

            // Performance indexes
            $table->index(['conversation_id', 'created_at']);
            $table->index('sender_id');
        });

        // CHECK constraint for type
        DB::statement("
            ALTER TABLE messages
            ADD CONSTRAINT messages_type_check
            CHECK (type IN ('text','image','video','pdf','doc','gif','sticker','ai'))
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};