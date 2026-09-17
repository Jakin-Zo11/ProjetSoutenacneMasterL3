<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminStudentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
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

Route::get('/register/options', [AuthController::class, 'registrationOptions']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register/student-lookup', [AuthController::class, 'findStudentByMatricule']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::prefix('admin/students')->group(function () {
        Route::get('/pending', [AdminStudentController::class, 'pending']);
        Route::post('/registry', [AdminStudentController::class, 'addToRegistry']);
        Route::post('/{user}/approve', [AdminStudentController::class, 'approve']);
        Route::post('/{user}/reject', [AdminStudentController::class, 'reject']);
    });

    Route::prefix('student')->group(function () {
        Route::get('/profile', [StudentController::class, 'profile']);
        Route::put('/profile', [StudentController::class, 'updateProfile']);
        Route::get('/submission', [StudentController::class, 'submission']);
        Route::post('/submission', [StudentController::class, 'saveSubmission']);
        Route::post('/submission/submit', [StudentController::class, 'submitSubmission']);
        Route::get('/submission/files/{file}/download', [StudentController::class, 'downloadFile']);
        Route::get('/notifications', [StudentController::class, 'notifications']);
        Route::post('/notifications/{notification}/read', [StudentController::class, 'markNotificationAsRead']);
        Route::post('/push-token', [StudentController::class, 'registerPushToken']);
    });

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
