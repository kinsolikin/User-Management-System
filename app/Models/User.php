<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id'
    ];



    // mengisi field nama secara otomatis dengan mengambili isi field di email
    public function setEmailAttribute($value)
    {
       // Set email attribute
    $this->attributes['email'] = $value;

    // Ambil bagian sebelum "@" dari email
    $name = substr($value, 0, strpos($value, '@'));

    // Hapus semua karakter non-huruf
    $name = preg_replace('/[^a-zA-Z]/', '', $name);

    // Set field name dengan nama yang sudah diproses
    $this->attributes['name'] = $name;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
