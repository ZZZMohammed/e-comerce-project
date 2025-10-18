<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::query()
            ->select(['id', 'name', 'slug'])
            ->withCount('products')
            ->orderBy('name')
            ->get();

        return response()->json($brands);
    }
}
