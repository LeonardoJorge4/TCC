<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'banner',
        'content',
        'slug',
    ];

    public function administrators()
    {
        $this->belongsTo(Administrator::class);
    }
}
