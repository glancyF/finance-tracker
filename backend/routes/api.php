<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use App\Http\Controllers\Profile\UpdateProfileController;
use App\Http\Controllers\Summary\ShowController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{RegisterController,LoginController,LogoutController,MeController};
use App\Http\Controllers\Budget\{StoreBudgetController,
    IndexBudgetsController,
    DestroyBudgetController,
    UpdateBudgetController};

Route::middleware(['web'])->group(function () {
    Route::post('/register', RegisterController::class)->middleware('guest');
    Route::post('/login',    LoginController::class)->middleware('guest');
    Route::post('/logout',   LogoutController::class)->middleware('auth:sanctum');
    Route::get('/me',        MeController::class)->middleware('auth:sanctum');
    Route::patch('/profile', UpdateProfileController::class)->middleware('auth:sanctum');
    Route::patch('/password', UpdatePasswordController::class)->middleware('auth:sanctum');
    Route::patch('/profile/currency', \App\Http\Controllers\Profile\UpdateCurrencyController::class)->middleware('auth:sanctum');


    Route::get('/budgets',IndexBudgetsController::class)->middleware('auth:sanctum');
    Route::post('/budgets', StoreBudgetController::class)->middleware('auth:sanctum');
    Route::delete('/budgets/{budget}', DestroyBudgetController::class)->middleware('auth:sanctum');
    Route::patch('/budgets/{budget}', UpdateBudgetController::class)->middleware('auth:sanctum');

    Route::get('/budgets/{budget}/transactions', \App\Http\Controllers\Transaction\IndexController::class);
    Route::post('/budgets/{budget}/transactions', \App\Http\Controllers\Transaction\StoreController::class);
    Route::patch('/transactions/{transaction}', \App\Http\Controllers\Transaction\UpdateController::class);
    Route::delete('/transactions/{transaction}', \App\Http\Controllers\Transaction\DestroyController::class);

    Route::get('/budgets/{budget}/categories', \App\Http\Controllers\Category\IndexController::class);

    Route::get('/summary', ShowController::class)->middleware('auth:sanctum');
});
