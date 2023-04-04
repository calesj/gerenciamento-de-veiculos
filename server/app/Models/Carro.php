<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carro extends Model
{
    protected $fillable= ['modelo','fabricante', 'ano', 'preco' ];

    public function defeitos() : HasMany
    {
        return $this->hasMany(Defeito::class);
    }
}
