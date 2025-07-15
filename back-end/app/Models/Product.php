<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{

    use HasFactory;
    
      protected $fillable = [
        'name', 'slug', 'description', 'price', 'stock', 'image', 'category_id', 'brand_id'
    ];

    // Product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Product belongs to a brand (optional)
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
