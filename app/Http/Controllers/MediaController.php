<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = Http::get('https://api-berita-indonesia.vercel.app/');
        $data = json_decode($response);
        
        return Inertia::render('Media',[
            'data' => $data
        ]);
    }

    public function antara_category($slug){
        
        $response = Http::get('https://api-berita-indonesia.vercel.app/');
       
        $data = collect(json_decode($response,true)['endpoints']);

        $filter =$data->firstWhere('name',$slug);

        return Inertia::render('Category', [
            'data' => $filter ? $filter['paths'] : [],
            'name' => $filter ? $filter['name'] : null,
        ]);

        

    }

    public function category_posts($mediaslug, $categoryslug){
      
        $response = Http::get('https://api-berita-indonesia.vercel.app/'.$mediaslug.'/'.$categoryslug);

        $data = json_decode($response,true);
        
        return Inertia::render('Posts',[
            'posts' => $data
        ]);

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
