<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use App\Http\Controllers\Profile\UpdateProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{RegisterController,LoginController,LogoutController,MeController};
use App\Http\Controllers\Budget\{StoreBudgetController,IndexBudgetsController,DestroyBudgetController};

Route::middleware(['web'])->group(function () {
    Route::post('/register', RegisterController::class)->middleware('guest');
    Route::post('/login',    LoginController::class)->middleware('guest');
    Route::post('/logout',   LogoutController::class)->middleware('auth:sanctum');
    Route::get('/me',        MeController::class)->middleware('auth:sanctum');
    Route::patch('/profile', UpdateProfileController::class)->middleware('auth:sanctum');
    Route::patch('/password', UpdatePasswordController::class)->middleware('auth:sanctum');
    Route::get('/budgets',IndexBudgetsController::class)->middleware('auth:sanctum');
    Route::post('/budgets', StoreBudgetController::class)->middleware('auth:sanctum');
    Route::delete('/budgets/{budget}', DestroyBudgetController::class)->middleware('auth:sanctum');

});
