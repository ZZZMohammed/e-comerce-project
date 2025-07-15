<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
     public function index()
    {
        $products = Product::with(['category', 'brand'])->paginate(10);
        return ProductResource::collection($products);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->with(['category', 'brand'])->firstOrFail();
        return new ProductResource($product);
    }
    
}
