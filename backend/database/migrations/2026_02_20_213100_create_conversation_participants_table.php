<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversation_participants', function (Blueprint $table) {

            $table->id();

            $table->foreignId('conversation_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('role')->default('member');

            $table->boolean('is_muted')->default(false);
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_archived')->default(false);

            $table->unsignedInteger('unread_count')->default(0);

            $table->timestamp('joined_at')->useCurrent();

            $table->timestamps();

            $table->unique(['conversation_id', 'user_id']);
            $table->index('user_id');
        });

        DB::statement("
            ALTER TABLE conversation_participants
            ADD CONSTRAINT participants_role_check
            CHECK (role IN ('admin', 'member'))
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('conversation_participants');
    }
};