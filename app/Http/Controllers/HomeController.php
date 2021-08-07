<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;

class HomeController extends Controller
{

    function register()
    {
        return view('user.register');
    }


    function facebooklogin(Request $request)
    {
        $checkUser = User::where('uid',$request->uid)->first();
        $checkUserEmail = User::where('email',$request->email)->first();
        
        if($request->status="already")
        {
            if($request->proider="google")
            {
                return response()->json([
                    "message" => "Use sign in with google"
                ]);
            }
            else if($request->proider="password")
            {
                return response()->json([
                    "message" => "Use sign in with email and password"
                ]);
            }
        }
        else
        {
            if($checkUser){
                $checkUser->uid = $request->uid;
                $checkUser->email = $this->nullcheck($request->email);
                $checkUser->phone = $this->nullcheck($request->phone);
                $checkUser->Save();
                return response()->json([
                    "status" => "success"
                ]);
    
            }else{
                if($checkUserEmail)
                {}
                else
                {
                    $user = new User;
                    $user->uid = $request->uid;
                    $user->email = $this->nullcheck($request->email);
                    $user->phone = $this->nullcheck($request->phone);
                    $user->usertype = "facebook";
                    $user->firstname = "";
                    $user->lastname = "";
                    $user->username = "";
                    $user->gender = "";
                    $user->bloodgroup = "";
                    $user->division = "";
                    $user->district = "";
                    $user->postcode = "0";
                    $user->verified = false;
                    $user->Save();
                    return response()->json([
                        "status" => "success"
                    ]);
                    }
            }
        }
    }

    function googlelogin(Request $request)
    {
        $checkUser = User::where('uid',$request->uid)->first();
        $checkUserEmail = User::where('email',$request->email)->first();


    	if($checkUser){
    		$checkUser->uid = $request->uid;
            $checkUser->email = $this->nullcheck($request->email);
            $checkUser->phone = $this->nullcheck($request->phone);
    		$checkUser->Save();
    		return response()->json([
    			"status" => "success"
    		]);

    	}else{
            if($checkUserEmail){}
            else{
                $user = new User;
                $user->uid = $request->uid;
                $user->email = $this->nullcheck($request->email);
                $user->phone = $this->nullcheck($request->phone);
                $user->usertype = "google";
                $user->firstname = "";
                $user->lastname = "";
                $user->username = "";
                $user->gender = "";
                $user->bloodgroup = "";
                $user->division = "";
                $user->district = "";
                $user->postcode = "0";
                $user->verified = false;
                $user->Save();
                return response()->json([
                    "status" => "success"
                ]);
            }
        }

    }

    function passwordlogin(Request $request){
        $checkUser = User::where('uid',$request->uid)->first();
        $checkUserEmail = User::where('email',$request->email)->first();


    	if($checkUser){
    		$checkUser->uid = $request->uid;
            $checkUser->email = $this->nullcheck($request->email);
            $checkUser->phone = $this->nullcheck($request->phone);
    		$checkUser->Save();
    		return response()->json([
    			"status" => "success"
    		]);

    	}else{
            if($checkUserEmail){}
            else{
                $user = new User;
                $user->uid = $request->uid;
                $user->email = $this->nullcheck($request->email);
                $user->phone = "";
                $user->usertype = "password";
                $user->firstname = "";
                $user->lastname = "";
                $user->username = "";
                $user->gender = "";
                $user->bloodgroup = "";
                $user->division = "";
                $user->district = "";
                $user->postcode = "0";
                $user->verified = $request->verified;
                $user->Save();
                return response()->json([
                    "status" => "success"
                ]);
            }
        }
    }

    function nullcheck($val)
    {
        if($val)
        {
            return $val;
        }
        else
        {
            $val = "";
            return $val;
        }
    }

    function saveUser(Request $request)
    {
        $request->validate([
            'email'=>'required|email|unique:users',
            'password'=>'required|confirmed|min:6|max:12',
        ]);

        $user = new User();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->firstname = "";
        $user->lastname = "";
        $user->username = "";
        $user->phone = "0";
        $user->gender = "";
        $user->bloodgroup = "";
        $user->division = "";
        $user->district = "";
        $user->postcode = "0";
        $user->verified = false;

        $save = $user->Save();
        return $request->input();
    }

    function checklogin(Request $req)
    {
        $req->validate([
            'email'=>'required',
            'password'=>'required|min:6|max:12',
        ]);

        $userInfo = User::where('email','=', $req->email)->first();
        if(!$userInfo){
            return redirect("welcome");
        }else{
            //check password
            if(Hash::check($req->password, $userInfo->password)){
                $req->session()->put('LoggedUser', $userInfo->id);
                return redirect("home");
            }else{
                return dd("Fail");
            }
        }
    }

    function check()
    {
        return view('home');
    }

    function userlogout()
    {
        if(session()->has('LoggedUser')){
            session()->pull('LoggedUser');
            return redirect('/welcome');
        }
    }
}
