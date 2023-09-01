<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;
use Inertia\Response;

class PlansController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Plans/Index', [
            'plans' => Plan::query()->forUser(auth()->user())->with('listItems')->get()
        ]);
    }
}
