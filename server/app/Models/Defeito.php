<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Defeito extends Model
{
    protected $fillable = ['carro_id', 'descricao'];

    public function carro()
    {
        return $this->belongsTo(Carro::class);
    }
}
