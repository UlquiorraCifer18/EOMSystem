<?php

use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
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

Route::get('programLeader/{pid}',[AuthController::class,'programLeadr']);

// Program related Routes

Route::get('programs/{id}',[ProgramsController::class, 'getProgramById']);
Route::get('programs/search/{query}',[ProgramsController::class, 'searchPrograms']);
Route::get('programs/filter/{filterBy}/{direction}',[ProgramsController::class, 'filterPrograms']);
Route::post('programs',[ProgramsController::class, 'addProgram']);
Route::put('programs/edit/{id}',[ProgramsController::class, 'editProgram']);
Route::post('programs/delete/{id}',[ProgramsController::class, 'deleteProgram']);

//Program-members routes
Route::post('members/{pid}',[ProgramsController::class, 'addMember']);
Route::get('members/{pid}',[ProgramsController::class, 'getMemberByProgram']);
Route::post('members/{id}',[ProgramsController::class, 'updateMember']);
Route::post('members/delete/{pid}/{uid}',[ProgramsController::class, 'deleteMember']);

//Program-participants routes
Route::post('participant/{pid}',[ProgramsController::class, 'addParticipant']);
Route::get('participant/{pid}',[ProgramsController::class, 'getParticipantByProgram']);
Route::post('participant/edit/{id}',[ProgramsController::class, 'updateParticipant']);
Route::post('participant/delete/{id}',[ProgramsController::class, 'deleteParticipant']);

//Program-partners routes
Route::post('partners/{pid}',[ProgramsController::class, 'addPartner']);
Route::get('program-partner/{pid}',[ProgramsController::class, 'getPartnerByProgram']);
Route::get('partner/{pid}',[ProgramsController::class, 'getPartnerById']);
Route::post('partner/update/{id}',[ProgramsController::class, 'updatePartner']);
Route::post('partner/delete/{id}',[ProgramsController::class, 'deletePartner']);
Route::get('partner/moa/expiring',[ProgramsController::class, 'expiringMoa']);
Route::post('partner/moa/renew/{id}',[ProgramsController::class, 'renewMoa']);
Route::get('partner/moa/{filename}', function ($filename) {
    $path = storage_path('app/public/moa_files/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    $response->header("Content-Disposition", "inline; filename=\"$filename\"");
    return $response;
});
//Program-files routes
Route::post('files/{pid}',[ProgramsController::class, 'addFile']);
Route::get('file/{pid}',[ProgramsController::class, 'getFileByProgram']);
Route::post('file/edit/{id}',[ProgramsController::class, 'updateFile']);
Route::post('file/delete/{id}',[ProgramsController::class, 'deleteFile']);
Route::get('files/{filename}', function ($filename) {
    $path = storage_path('app/public/program_files/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    $response->header("Content-Disposition", "inline; filename=\"$filename\"");
    return $response;
});

Route::middleware('auth')->group( function(){

});
//UserModel routes
Route::get('users/pending',[AuthController::class, 'pendingUsers']);
Route::post('signup/',[AuthController::class, 'signup']);
Route::post('login', [AuthController::class,'login']);
Route::post('user/update-password/{id}',[AuthController::class,'updateUserPassword']);
Route::get('user/{id}',[AuthController::class,'getUserById']);
Route::post('user/edit/{id}',[AuthController::class, 'editUser']);
Route::post('user/delete/{id}',[AuthController::class, 'deleteUser']);
Route::get('users',[AuthController::class,'getUsers']);
Route::post('me', [AuthController::class, 'me']);
Route::get('user/photo/{filename}', function ($filename) {
    $path = storage_path('app/public/userPhoto/' . $filename);
    if (!File::exists($path)) {
        return 'no image';
    }

    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});

Route::get('userRole',[AuthController::class,'userRole']);

Route::get('leaderof',[ProgramsController::class,'programByLeader']);
Route::get('memberof',[ProgramsController::class,'programsByMember']);
//Trying out notification
Route::get('/notify',[ProgramsController::class,'notify']);


//for dashboard
Route::get('activeprograms/count',[ProgramsController::class,'upcomingProgramsCount']);
Route::get('pastprograms/count',[ProgramsController::class,'pastProgramsCount']);
Route::get('expiredmoa/count',[ProgramsController::class,'expiredMoaCount']);
Route::get('activemoa/count',[ProgramsController::class,'activeMoaCount']);

Route::group(['middleware' => 'api',], function ($router) {
    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');

});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('programs',[ProgramsController::class, 'getPrograms']);
});

