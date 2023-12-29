<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserProfileRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the notes / resources
     */
    public function index(Request $request)
    {
    }

    /**
     * Store a newly created item / resource to the database
     */
    public function store(Request $request)
    {
    }

    /**
     * Display a specified item / resource
     */
    public function show($userId)
    {
        try {
            $user = User::find($userId);
            // $user = User::find($userId);

            if ($user) {
                return response()->json([
                    'data' => $user,
                    'success' => true,
                    'message' => 'Get data successfully!',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Profile not found!',
            ], 404);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified item / resource in database
     */
    public function update(UpdateUserProfileRequest $request, $userId)
    {
        try {
            // Update profile in the database
            $data = $request->validated();
            $user = User::find($userId);

            // Not a way to validate because we don't get the current authenticated user
            if ($user->id != $data['user_id']) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to update this profile!',
                ], 401);
            }

            $user->userProfile()->update($data);

            return response()->json([
                'data' => $user,
                'message' => 'Profile updated successfully!',
                'success' => true,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->errors(),
            ], 422);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
