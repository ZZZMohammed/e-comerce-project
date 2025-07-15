<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
     protected $model = Product::class;

    public function definition()
    {
        // Pick random category and brand IDs from existing DB or fallback to 1
        $categoryId = Category::inRandomOrder()->value('id') ?? 1;
        $brandId = Brand::inRandomOrder()->value('id') ?? 1;

       $name = ucfirst($this->faker->unique()->words(3, true)); // e.g., "Sport Club Shirt"


        if (!method_exists($this->faker, 'productName')) {
            $name = ucfirst($this->faker->words(3, true));
        }

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 50, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'image' => 'product_' . $this->faker->numberBetween(1, 10) . '.jpg', // fake image names
            'category_id' => $categoryId,
            'brand_id' => $brandId,
        ];
    }
}
