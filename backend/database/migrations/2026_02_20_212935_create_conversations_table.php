<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {

            $table->id();

            $table->string('type'); // private | group

            $table->string('title')->nullable();
            $table->string('avatar')->nullable();

            $table->foreignId('created_by')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->boolean('is_locked')->default(false);

            $table->timestamps();
            $table->softDeletes();

            $table->index('type');
            $table->index('created_by');
        });

        // Postgres CHECK constraint (better than enum)
        DB::statement("
            ALTER TABLE conversations
            ADD CONSTRAINT conversations_type_check
            CHECK (type IN ('private', 'group'))
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};