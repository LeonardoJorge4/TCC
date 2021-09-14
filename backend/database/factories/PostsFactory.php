<?php

namespace Database\Factories;

use App\Models\Posts;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Posts::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'admin_id' => random_int(1, 10),
            'title' => $this->faker->sentence(),
            'subtitle' => $this->faker->sentence(),
            'banner' => $this->faker->image(),
            'content' => $this->faker->paragraph(100),
            'slug' => $this->faker->slug(),
        ];
    }
}
