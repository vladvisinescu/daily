<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreListEntryRequest;
use App\Http\Requests\UpdateListEntryRequest;
use App\Models\ListEntry;

class ListEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListEntryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ListEntry $listEntry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ListEntry $listEntry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListEntryRequest $request, ListEntry $listEntry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ListEntry $listEntry)
    {
        //
    }
}
