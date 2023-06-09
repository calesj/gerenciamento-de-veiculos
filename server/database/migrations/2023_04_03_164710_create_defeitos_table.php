<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defeitos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('carro_id');
            $table->string('descricao');
            $table->timestamps();

            // se o carro for deletado utilizamos o onDelete('cascade') para deletar também os defeitos relacionados a ele
            $table->foreign('carro_id')->references('id')->on('carros')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defeitos');
    }
};
