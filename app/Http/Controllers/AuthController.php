<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Password;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthController extends Controller
{
    //Register

    public function createRegister(Request $request)
    {
        $verify = $request->query('verify');

        return Inertia::render('Register', [
            'verify' => $verify
        ]);
    }

    public function Register(Request $request)
    {



        $validate = $request->validate([

            'email' => 'required|unique:users,email',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required'

        ]);

        $user = User::create($validate);


        event(new Registered($user));
        
        Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'data berhasil di tambahkan, silahkan buka email anda untuk verifikasi');
    }

    // Verifikasi Acount

    public function verify()
    {

        dd('berhasil verifikasi');
    }

    public function verifyact(EmailVerificationRequest $request)
    {
        $request->fulfill();

        echo 'email berhasil terverifikasi';
    }


    // Login manual
    public function login()
    {
        return Inertia::render('Log_in');
    }

    public function storelogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);


        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            return redirect()->route('dashboard');

        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }



    // Login With Google

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }


    public function googleredirect()
    {


        $googleuser = Socialite::driver('google')->user();


        // URL gambar profil pengguna
        $profileImageUrl = $googleuser->avatar;

        // Mendownload gambar dari URL
        $imageContent = Http::get($profileImageUrl)->body();

        // Menentukan nama file dan path penyimpanan
        $imageName = 'profile_' . Str::random(10) . '.jpg';
        $path = 'avatar/' . $imageName;




        // Menyimpan gambar ke storage
        Storage::put($path, $imageContent);


        $user = User::updateOrCreate([
            'email' => $googleuser->email,
        ], [
            'id' => $googleuser->id,
            'token' => $googleuser->token,
            'avatar' => $path
        ]);



        Auth::login($user);


        return redirect()->route('dashboard')->with('success', 'data berhasil di tambahkan, silahkan buka email anda untuk verifikasi');
    }

    // Logout
    public function logout(Request $request)
    {

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    // forgot password

    public function forgotpassword()
    {
        return Inertia::render('Forgot_Password');
    }

    public function sendLink(Request $request)
    {

        $request->validate(['email' => 'required']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? redirect('login')->with('sendlinkreset', 'Silahkan cek email untuk reset password')
            : back()->withErrors(['email' => __($status)]);
    }

    public function resetact(Request $request)
    {

        return Inertia::render('Form_resetpassword', [
            'token' => $request->token,
            'email' => $request->email
        ]);
    }


    public function updatepassword(Request $request)
    {


        $request->validate([
            'token' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ?  redirect('login')
            : back()->withErrors(['email' => [__($status)]]);
    }




    public function editprofile()
    {
        return Inertia::render('Formeditprofile');
    }

    public function storeeditprofile(Request $request)
    {


        $request->validate([
            'name' => 'required',
              'password' => 'nullable|confirmed',
            'password_confirmation' => 'nullable',
            'file' =>'nullable'
        ]);


        $id = Auth::id();
        
        $user = User::findOrFail($id);

        $oldfilepath = $user->avatar;

        $newFilePath = $oldfilepath;

        if($request->hasFile('file')){

            if ($oldfilepath && Storage::disk('public')->exists($oldfilepath)) {
                Storage::disk('public')->delete($oldfilepath);
            
            }

            $newFilePath = $request->file('file')->store('avatar', 'public');
        }




        $user = User::updateOrCreate([
            'id' => $id,
        ], [
            'name' => $request->name,
            'password' => $request->password,
            'avatar' => $newFilePath
        ]);

        redirect()->back()->with('success', 'profile berhasili di edit');


    }

    public function deleteacount(){

        $id = Auth::id();
        $user = User::find($id);

        if($user){
            $user->delete();
            return redirect()->route('login')->with('success','Acount bserhasil di hapus');
        }else{
            return redirect()->back()->with('success','user not found');
        }
        
    }
}
