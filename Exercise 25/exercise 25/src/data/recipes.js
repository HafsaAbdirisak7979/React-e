// Recipe Data
export const recipes = [
  {
    id: 1,
    title: 'Classic Chocolate Cake',
    description: 'Rich and moist chocolate cake perfect for any occasion',
    category: 'desserts',
    ingredients: [
      '2 cups flour',
      '1 cup sugar',
      '3 eggs',
      '1 cup milk',
      '1/2 cup cocoa powder',
      '1 tsp baking powder',
      '1/2 tsp salt'
    ],
    instructions: [
      'Preheat oven to 350°F',
      'Mix dry ingredients in a bowl',
      'Add wet ingredients and mix until smooth',
      'Pour into greased cake pan',
      'Bake for 25 minutes',
      'Let cool before serving'
    ]
  },
  {
    id: 2,
    title: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta with creamy egg sauce',
    category: 'dinner',
    ingredients: [
      '400g Spaghetti',
      '4 large Eggs',
      '200g Pecorino cheese',
      '150g Pancetta',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Cook pasta in salted boiling water until al dente',
      'Fry pancetta until crispy',
      'Mix eggs and grated cheese in a bowl',
      'Drain pasta and mix with pancetta',
      'Add egg mixture quickly while pasta is hot',
      'Season with black pepper and serve'
    ]
  },
  {
    id: 3,
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta cheese',
    category: 'lunch',
    ingredients: [
      '2 large tomatoes',
      '1 cucumber',
      '1 red onion',
      '200g feta cheese',
      'Kalamata olives',
      'Olive oil',
      'Oregano'
    ],
    instructions: [
      'Chop tomatoes and cucumber',
      'Slice red onion thinly',
      'Combine vegetables in a bowl',
      'Add olives and crumbled feta',
      'Drizzle with olive oil',
      'Sprinkle with oregano'
    ]
  },
  {
    id: 4,
    title: 'Breakfast Smoothie Bowl',
    description: 'Healthy and colorful breakfast bowl',
    category: 'breakfast',
    ingredients: [
      '1 banana',
      '1/2 cup frozen berries',
      '1/2 cup yogurt',
      '1/4 cup milk',
      'Granola',
      'Fresh fruits for topping'
    ],
    instructions: [
      'Blend banana, berries, yogurt and milk',
      'Pour into a bowl',
      'Top with granola and fresh fruits',
      'Serve immediately'
    ]
  },
  {
    id: 5,
    title: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable stir fry',
    category: 'dinner',
    ingredients: [
      '2 bell peppers',
      '1 broccoli',
      '2 carrots',
      '1 onion',
      'Soy sauce',
      'Garlic',
      'Ginger'
    ],
    instructions: [
      'Chop all vegetables',
      'Heat oil in a wok',
      'Stir-fry garlic and ginger',
      'Add vegetables and cook until tender',
      'Season with soy sauce',
      'Serve with rice'
    ]
  }
];

// Categories
export const categories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Start your day right'
  },
  {
    id: 'lunch',
    name: 'Lunch',
    description: 'Midday favorites'
  },
  {
    id: 'dinner',
    name: 'Dinner',
    description: 'Evening meals'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats'
  }
];