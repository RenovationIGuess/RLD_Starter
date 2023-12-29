<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class SocialiteController extends Controller
{
    /*
        $user_data will includes:
        token
        refreshToken
        expiresIn
        approvedScopes
        id
        nickname
        name
        email
        avatar
    */

    // Github OAuth
    public function githubRedirect()
    {
        // return Socialite::driver('github')->redirect();
        return response()->json([
            'url' => Socialite::driver('github')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function githubCallback()
    {
        $user_data = Socialite::driver('github')->stateless()->user();
        $token = null;
        $user = null;

        // &$user => reference to the user
        DB::transaction(function () use ($user_data, &$user, &$token) {
            // First param - condition to query
            // Second param - additional attribute to create when not found in db
            $socialAccount = SocialAccount::firstOrNew(
                ['social_id' => $user_data->getId(), 'social_provider' => 'github'],
                [
                    'social_name' => $user_data->getName(),
                    'social_avatar' => $user_data->getAvatar(),
                    'social_email' => $user_data->getEmail(),
                ]
            );

            // If the social account is not linked to any account in db, we'll create a new user only if the social email is not used
            if (!($user = $socialAccount->user)) {
                // Generate a random string
                $uuid = Str::uuid()->toString();

                // Check if there is a user with the same email exist
                $user = User::where('email', $user_data->getEmail())->first();

                // If not, create new user
                if (!$user) {
                    $user = User::create([
                        'email' => $user_data->getEmail(),
                        'password' => bcrypt($uuid),
                    ]);

                    $user->userProfile()->update(
                        [
                            'name' => $user_data->name,
                            'avatar' => $user_data->avatar,
                        ]
                    );
                }

                $socialAccount->fill(['user_id' => $user->id])->save();
            }

            // Create a token for the user
            // $token = $user->createToken('main')->plainTextToken;
            $token = JWTAuth::fromUser($user);
        });

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Google OAuth
    public function googleRedirect()
    {
        // return Socialite::driver('google')->redirect();
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function googleCallback()
    {
        $user_data = Socialite::driver('google')->stateless()->user();
        $token = null;
        $user = null;

        // &$user => reference to the user
        DB::transaction(function () use ($user_data, &$user, &$token) {
            // First param - condition to query
            // Second param - additional attribute to create when not found in db
            $socialAccount = SocialAccount::firstOrNew(
                ['social_id' => $user_data->getId(), 'social_provider' => 'google'],
                [
                    'social_name' => $user_data->getName(),
                    'social_avatar' => $user_data->getAvatar(),
                    'social_email' => $user_data->getEmail(),
                ]
            );

            // If the social account is not linked to any account in db, we'll create a new user
            if (!($user = $socialAccount->user)) {
                // Generate a random string
                $uuid = Str::uuid()->toString();

                // Check if there is a user with the same email exist
                $user = User::where('email', $user_data->getEmail())->first();

                // If not, create new user
                if (!$user) {
                    $user = User::create([
                        'email' => $user_data->getEmail(),
                        'password' => bcrypt($uuid),
                    ]);

                    $user->userProfile()->update(
                        [
                            'name' => $user_data->name,
                            'avatar' => $user_data->avatar,
                        ]
                    );
                }

                $socialAccount->fill(['user_id' => $user->id])->save();
            }

            // $token = $user->createToken('main')->plainTextToken;
            $token = JWTAuth::fromUser($user);
        });

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
