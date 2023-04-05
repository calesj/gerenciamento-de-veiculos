<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::prefix('carro')->group( function () {
    Route::get('', [\App\Http\Controllers\CarroController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\CarroController::class, 'show']);
    Route::post('', [\App\Http\Controllers\CarroController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\CarroController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CarroController::class, 'delete']);
});

Route::prefix('defeito')->group( function () {
    Route::get('', [\App\Http\Controllers\DefeitoController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\DefeitoController::class, 'show']);
    Route::post('', [\App\Http\Controllers\DefeitoController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\DefeitoController::class, 'update']);
    Route::delete('', [\App\Http\Controllers\DefeitoController::class, 'delete']);
});

