
// src/data/recipes.js
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta made with eggs, cheese, crispy bacon, and black pepper.",
    image:
      "https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg",
    ingredients: [
      "200g Spaghetti",
      "2 Eggs",
      "1/2 cup Grated Parmesan Cheese",
      "4–5 Bacon Strips (chopped)",
      "Salt to taste",
      "Black Pepper (freshly crushed)"
    ],
    instructions: [
      "Boil spaghetti in salted water until al dente.",
      "Cook chopped bacon in a pan until crispy, then turn off the heat.",
      "In a bowl, whisk eggs with grated Parmesan cheese.",
      "Drain the pasta and add it to the warm bacon pan.",
      "Pour the egg-cheese mixture over pasta and quickly toss (the heat cooks the eggs).",
      "Season with lots of black pepper and serve warm."
    ]
  },

  {
    id: 2,
    title: "Avocado Toast",
    description: "Healthy and creamy smashed avocado served on warm toasted bread.",
    image: "https://tse3.mm.bing.net/th/id/OIP.tq_10MZG4nq-nn6tvH_umQHaLL?rs=1&pid=ImgDetMain",
    ingredients: [
      "2 Bread Slices",
      "1 Ripe Avocado",
      "Salt to taste",
      "Black Pepper",
      "Chili Flakes",
      "1 tsp Lemon Juice (optional)"
    ],
    instructions: [
      "Toast the bread slices until golden and crispy.",
      "Cut the avocado, remove the seed, and scoop the flesh into a bowl.",
      "Mash it with a fork and mix in salt, pepper, and lemon juice.",
      "Spread the mashed avocado evenly on the toast.",
      "Sprinkle chili flakes and serve immediately."
    ]
  },

  {
    id: 3,
    title: "Red Sauce Pasta",
    description: "Delicious pasta tossed in a rich tomato, garlic, and basil sauce.",
    image: "https://assets.nhs.uk/prod/images/A_0518_tomato_pasta_J47AJ4.2e16d0ba.fill-920x613.jpg",
    ingredients: [
      "200g Pasta",
      "1 cup Tomato Sauce",
      "2 Garlic Cloves (finely chopped)",
      "Fresh Basil Leaves",
      "1 tbsp Olive Oil",
      "Salt & Pepper to taste"
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "Heat olive oil in a pan and sauté garlic until fragrant.",
      "Add tomato sauce, salt, pepper, and basil. Cook for 5–7 minutes.",
      "Mix cooked pasta into the sauce and toss well.",
      "Garnish with basil and serve hot."
    ]
  },

  {
    id: 4,
    title: "Vegan Salad Bowl",
    description: "A colorful, nutrient-packed bowl of veggies, grains, and dressing.",
    image: "https://bing.com/th?id=OSK.dd69bdb144eb1f0e349628cc1ed57014",
    ingredients: [
      "1 cup Mixed Greens",
      "1/2 cup Cooked Quinoa",
      "1 cup Mixed Veggies (cucumber, tomato, carrot, corn)",
      "2 tbsp Salad Dressing"
    ],
    instructions: [
      "Cook quinoa according to instructions and let it cool.",
      "Chop all vegetables into bite-size pieces.",
      "Add greens, quinoa, and veggies to a bowl.",
      "Drizzle your favorite dressing and toss gently.",
      "Serve fresh."
    ]
  },

  {
    id: 5,
    title: "Chocolate Cake",
    description: "Rich, moist chocolate cake with creamy frosting.",
    image: "https://www.oogio.net/wp-content/uploads/2018/11/American_chocolate_cake6-s.jpg",
    ingredients: [
      "1½ cups Flour",
      "1 cup Sugar",
      "1/3 cup Cocoa Powder",
      "2 Eggs",
      "1/2 cup Butter (melted)",
      "1 cup Milk",
      "1 tsp Baking Powder"
    ],
    instructions: [
      "Mix all dry ingredients (flour, cocoa, sugar, baking powder).",
      "Add eggs, melted butter, and milk. Whisk into a smooth batter.",
      "Pour the batter into a greased cake tin.",
      "Bake at 180°C for 30–35 minutes.",
      "Let the cake cool completely; apply frosting and serve."
    ]
  },

  {
    id: 6,
    title: "Sushi Platter",
    description: "Fresh homemade sushi rolls with rice, seaweed, fish, and vegetables.",
    image: "https://tse4.mm.bing.net/th/id/OIP.hX-6gzvgC5Xahc4vw-zQqAHaJ4?rs=1&pid=ImgDetMain",
    ingredients: [
      "2 cups Sushi Rice",
      "Nori Sheets",
      "Fresh Salmon/Tuna Strips",
      "Cucumber & Carrot Strips",
      "Soy Sauce"
    ],
    instructions: [
      "Cook sushi rice and season with vinegar, sugar, and salt.",
      "Place a nori sheet on the mat and spread rice evenly.",
      "Add fish and vegetable strips.",
      "Roll tightly using the mat.",
      "Slice into pieces and serve with soy sauce."
    ]
  },

  {
    id: 7,
    title: "Pancakes Stack",
    description: "Soft, fluffy pancakes topped with fruits, honey, or syrup.",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-stack-of-pancakes-covered-in-berries-is-on-a-table-image_2679332.jpg",
    ingredients: [
      "1 cup Flour",
      "1 cup Milk",
      "1 Egg",
      "1 tbsp Sugar",
      "1 tsp Baking Powder",
      "Butter for cooking"
    ],
    instructions: [
      "Mix flour, sugar, and baking powder in a bowl.",
      "Whisk milk and egg together, then pour into the dry mix.",
      "Stir until smooth.",
      "Heat butter in a pan and pour small scoops of batter.",
      "Cook until bubbles appear; flip and cook the other side.",
      "Stack pancakes and top with syrup/fruits."
    ]
  },

  {
    id: 8,
    title: "Mediterranean Bowl",
    description: "A refreshing bowl with grains, veggies, feta cheese, and olives.",
    image: "https://i.pinimg.com/originals/38/fb/7d/38fb7d073f3ac1481d65572b07a9afd1.jpg",
    ingredients: [
      "1 cup Cooked Grains (rice/quinoa)",
      "Chopped Veggies (lettuce, tomato, cucumber)",
      "1/4 cup Feta Cheese",
      "Olives",
      "Mediterranean Dressing"
    ],
    instructions: [
      "Fill a bowl with cooked grains.",
      "Add fresh chopped vegetables on top.",
      "Sprinkle feta cheese and olives.",
      "Drizzle Mediterranean dressing.",
      "Mix slightly and serve."
    ]
  }
];

export default recipes;
