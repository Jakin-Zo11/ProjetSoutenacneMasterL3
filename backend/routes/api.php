<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Modules\Evaluation\Http\Controllers\DefenseEvaluationController;
use App\Modules\Evaluation\Http\Controllers\EvaluationGridController;

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

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/evaluation-grids', [EvaluationGridController::class, 'index']);
    Route::post('/evaluation-grids', [EvaluationGridController::class, 'store']);
    Route::get('/evaluation-grids/{evaluationGrid}', [EvaluationGridController::class, 'show']);
    Route::put('/evaluation-grids/{evaluationGrid}', [EvaluationGridController::class, 'update']);
    Route::delete('/evaluation-grids/{evaluationGrid}', [EvaluationGridController::class, 'destroy']);
    Route::post('/evaluation-grids/{evaluationGrid}/criteria', [EvaluationGridController::class, 'addCriterion']);
    Route::put('/evaluation-criteria/{criterion}', [EvaluationGridController::class, 'updateCriterion']);
    Route::delete('/evaluation-criteria/{criterion}', [EvaluationGridController::class, 'destroyCriterion']);

    Route::get('/evaluations/assigned', [DefenseEvaluationController::class, 'assigned']);
    Route::post('/evaluations', [DefenseEvaluationController::class, 'store']);
    Route::get('/evaluations/{evaluation}', [DefenseEvaluationController::class, 'show']);
    Route::put('/evaluations/{evaluation}/scores', [DefenseEvaluationController::class, 'saveScores']);
    Route::post('/evaluations/{evaluation}/validate', [DefenseEvaluationController::class, 'validateEvaluation']);
    Route::post('/evaluations/{evaluation}/lock', [DefenseEvaluationController::class, 'lock']);
});
