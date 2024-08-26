<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UsersController;
use GuzzleHttp\Psr7\Request;

// Register
Route::middleware('guest')->get('/register',[AuthController::class ,'createRegister'])->name('register');

Route::post('/register',[AuthController::class,'Register']);


// Login Manual
Route::middleware('guest')->get('login',[AuthController::class,'login'])->name('login');

Route::middleware('guest')->post('login',[AuthController::class,'storelogin']);


// route dashboard
Route::middleware('auth')->get('dashboard',[DashboardController::class,'index'])->name('dashboard');
Route::middleware('auth')->get('seting',[DashboardController::class,'seting']);


// route login with google
Route::get('/auth/redirect',[AuthController::class,'redirect']);

Route::get('/google/redirect',[AuthController::class,'googleredirect']);

//Verifiaksi Acount

Route::middleware(['auth'])->get('/email/verify/{id}/{hash}',[AuthController::class,'verifyact'])->name('verification.verify');


//Route Logout

Route::post('/logout',[AuthController::class,'logout']);

// Reset Password
Route::middleware('guest')->get('/forgot-password', [AuthController::class,'forgotpassword']);

Route::post('/forgot-password',[AuthController::class,'sendLink']);

Route::middleware('guest')->get('/reset-password/{token}', [AuthController::class,'resetact'])->name('password.reset');

Route::post('/reset-password',[AuthController::class,'updatepassword']);




// Route Home
Route::get('home',[HomeController::class, 'index']);


// Route Users
Route::middleware('auth')->get('users',[UsersController::class,'index']);




// Route Media
Route::get('media',[MediaController::class,'index']);

Route::get('media/{slug}',[MediaController::class,'antara_category']);
Route::get('media/{mediaslug}/{categoryslug}',[MediaController::class,'category_posts']);