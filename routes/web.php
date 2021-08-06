<?php

use App\Http\Controllers\CreateController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::post('/user/save', [HomeController::class, 'saveUser']);
Route::post('/user/check', [HomeController::class, 'checklogin']);
Route::post('/social/login', [HomeController::class,'facebooklogin']);
Route::post('/social/login', [HomeController::class,'googlelogin']);
Route::post('/user/logout',[HomeController::class,'userlogout']);

Route::get('/create-account',function(){
    return view('create-account');
});

Route::group(['middleware'=>['UserAuthCheck']], function(){
    Route::get('/welcome', function () {
        return view('welcome');
    });
    Route::get('/home',[HomeController::class,'check']);

    Route::post('/user/create', [CreateController::class,'createaccount']);

});
