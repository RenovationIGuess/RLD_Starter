<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = "user_profiles";

    protected $fillable = [
        'name',
        'sign',
        'avatar',
        'background_image',
    ];

    // A profile belongs to a certain user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
