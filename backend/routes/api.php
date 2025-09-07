<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{RegisterController,LoginController,LogoutController,MeController};


Route::middleware(['web'])->group(function () {
    Route::post('/register', RegisterController::class)->middleware('guest');
    Route::post('/login',    LoginController::class)->middleware('guest');
    Route::post('/logout',   LogoutController::class)->middleware('auth:sanctum');
    Route::get('/me',        MeController::class)->middleware('auth:sanctum');
});
