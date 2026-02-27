

// import React, { useEffect, useState } from "react";
// import RecipeCard from "../components/RecipeCard";
// import { getAllRecipes } from "../services/api";
// import { useLocation } from "react-router-dom";

// const Recipes = () => {
//     const location = useLocation();

//     // 🔥 Static recipes (manual, UI unchanged)
//     const staticRecipes = [
//         {
//             id: 1,
//             title: "Spaghetti Carbonara",
//             description: "Classic Italian pasta with creamy sauce and bacon.",
//             image:
//                 "https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg",
//         },
//         {
//             id: 2,
//             title: "Avocado Toast",
//             description: "Healthy breakfast with smashed avocado and spices.",
//             image:
//                 "https://tse3.mm.bing.net/th/id/OIP.tq_10MZG4nq-nn6tvH_umQHaLL?rs=1&pid=ImgDetMain",
//         },
//         {
//             id: 3,
//             title: "Red Sauce Pasta",
//             description: "Delicious pasta in rich tomato and basil sauce.",
//             image:
//                 "https://assets.nhs.uk/prod/images/A_0518_tomato_pasta_J47AJ4.2e16d0ba.fill-920x613.jpg",
//         },
//         {
//             id: 4,
//             title: "Vegan Salad Bowl",
//             description: "Colorful vegetables and grains with tasty dressing.",
//             image:
//                 "https://bing.com/th?id=OSK.dd69bdb144eb1f0e349628cc1ed57014",
//         },
//         {
//             id: 5,
//             title: "Chocolate Cake",
//             description: "Rich and moist chocolate cake with frosting.",
//             image:
//                 "https://www.oogio.net/wp-content/uploads/2018/11/American_chocolate_cake6-s.jpg",
//         },
//         {
//             id: 6,
//             title: "Sushi Platter",
//             description: "Fresh sushi rolls with salmon, tuna, and veggies.",
//             image:
//                 "https://tse4.mm.bing.net/th/id/OIP.hX-6gzvgC5Xahc4vw-zQqAHaJ4?rs=1&pid=ImgDetMain",
//         },
//         {
//             id: 7,
//             title: "Pancakes Stack",
//             description: "Fluffy pancakes topped with syrup and fruits.",
//             image:
//                 "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-stack-of-pancakes-covered-in-berries-is-on-a-table-image_2679332.jpg",
//         },
//         {
//             id: 8,
//             title: "Mediterranean Bowl",
//             description: "Healthy grains, veggies, and protein-rich toppings.",
//             image:
//                 "https://i.pinimg.com/originals/38/fb/7d/38fb7d073f3ac1481d65572b07a9afd1.jpg",
//         },
//     ];

//     // 🔥 Backend recipes
//     const [backendRecipes, setBackendRecipes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [viewRecipeId, setViewRecipeId] = useState(null);

//     const fetchRecipes = async () => {
//         try {
//             setLoading(true);
//             const data = await getAllRecipes();
//             setBackendRecipes(Array.isArray(data.recipes) ? data.recipes : []);
//         } catch (err) {
//             console.error("Failed to load recipes:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRecipes();
//     }, [location.pathname]);

//     const pageStyle = {
//         padding: "4rem 2rem",
//         maxWidth: "1200px",
//         margin: "auto",
//         backgroundColor: "#fafafa",
//         fontFamily: "'Poppins', sans-serif",
//     };

//     const gridStyle = {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "2rem",
//     };

//     const cardStyle = {
//         border: "1px solid #ddd",
//         borderRadius: 10,
//         padding: 15,
//         backgroundColor: "#fff",
//         boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
//     };

//     const buttonStyle = {
//         padding: "6px 12px",
//         borderRadius: 6,
//         border: "none",
//         cursor: "pointer",
//         fontWeight: 500,
//         marginRight: 8,
//     };

//     return (
//         <section style={pageStyle}>
//             <h1
//                 style={{
//                     textAlign: "center",
//                     marginBottom: "3rem",
//                     fontSize: "2.5rem",
//                     color: "#ff4b4b",
//                     fontWeight: 700,
//                 }}
//             >
//                 All Recipes
//             </h1>

//             {loading && <p>Loading recipes...</p>}

//             <div style={gridStyle}>
//                 {/* Render static recipes first (UI unchanged) */}
//                 {staticRecipes.map((recipe) => (
//                     <RecipeCard key={recipe.id} recipe={recipe} />
//                 ))}

//                 {/* Render backend recipes without delete button */}
//                 {backendRecipes.map((recipe) => (
//                     <div key={recipe._id} style={cardStyle}>
//                         <img
//                             src={recipe.imageUrl}
//                             alt={recipe.title}
//                             style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
//                         />
//                         <h3 style={{ marginBottom: 6 }}>{recipe.title}</h3>
//                         <p style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>{recipe.description}</p>

//                         {/* Only View Recipe button */}
//                         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
//                             <button
//                                 onClick={() => setViewRecipeId(viewRecipeId === recipe._id ? null : recipe._id)}
//                                 style={{ ...buttonStyle, backgroundColor: "#4caf50", color: "#fff" }}
//                             >
//                                 {viewRecipeId === recipe._id ? "Hide Details" : "View Recipe"}
//                             </button>
//                         </div>

//                         {viewRecipeId === recipe._id && (
//                             <div style={{ marginTop: 10, backgroundColor: "#fff3f3", padding: 10, borderRadius: 6 }}>
//                                 <p>
//                                     <strong>Category:</strong> {recipe.category || "-"}
//                                 </p>
//                                 <p>
//                                     <strong>Cooking Time:</strong> {recipe.cookingTime || "-"} mins
//                                 </p>
//                                 <h4>Ingredients</h4>
//                                 <ul>
//                                     {Array.isArray(recipe.ingredients)
//                                         ? recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)
//                                         : [recipe.ingredients].map((ing, i) => <li key={i}>{ing}</li>)}
//                                 </ul>
//                                 <h4>Steps</h4>
//                                 <ol>
//                                     {Array.isArray(recipe.steps)
//                                         ? recipe.steps.map((step, i) => <li key={i}>{step}</li>)
//                                         : [recipe.steps].map((step, i) => <li key={i}>{step}</li>)}
//                                 </ol>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Recipes;


import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

const Recipes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // STATIC RECIPES
    const staticRecipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            description: "Classic Italian pasta with creamy sauce and bacon.",
            image:
                "https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg",
            ingredients: [
                "Spaghetti – boil until al dente",
                "Eggs – beaten well",
                "Bacon – fry until crispy",
                "Cheese – grated parmesan",
                "Black Pepper – freshly crushed"
            ],
            instructions: [
                "Boil spaghetti until al dente.",
                "Cook bacon until crispy.",
                "Mix eggs and cheese in a bowl.",
                "Add hot pasta into the egg mixture and stir quickly.",
                "Sprinkle black pepper and serve hot."
            ]
        },
        {
            id: 2,
            title: "Avocado Toast",
            description: "Healthy breakfast with smashed avocado and spices.",
            image:
                "https://tse3.mm.bing.net/th/id/OIP.tq_10MZG4nq-nn6tvH_umQHaLL?rs=1&pid=ImgDetMain",
            ingredients: [
                "Bread – toasted",
                "Avocado – mashed",
                "Salt – pinch",
                "Pepper – freshly crushed",
                "Chili Flakes – for spice"
            ],
            instructions: [
                "Toast the bread.",
                "Mash the avocado.",
                "Spread avocado on toast.",
                "Add salt, pepper, chili flakes."
            ]
        },
        {
            id: 3,
            title: "Red Sauce Pasta",
            description: "Delicious pasta in rich tomato and basil sauce.",
            image:
                "https://assets.nhs.uk/prod/images/A_0518_tomato_pasta_J47AJ4.2e16d0ba.fill-920x613.jpg",
            ingredients: [
                "Pasta – boiled",
                "Tomato puree",
                "Garlic – chopped",
                "Olive oil",
                "Basil leaves"
            ],
            instructions: [
                "Boil pasta.",
                "Cook garlic in olive oil.",
                "Add tomato puree & simmer.",
                "Mix pasta with sauce.",
                "Garnish with basil."
            ]
        },
        {
            id: 4,
            title: "Vegan Salad Bowl",
            description: "Colorful vegetables and grains with tasty dressing.",
            image: "https://bing.com/th?id=OSK.dd69bdb144eb1f0e349628cc1ed57014",
            ingredients: [
                "Lettuce",
                "Cherry tomatoes",
                "Cucumber",
                "Quinoa",
                "Olive oil dressing"
            ],
            instructions: [
                "Chop all veggies.",
                "Mix quinoa & vegetables.",
                "Drizzle olive oil dressing.",
                "Serve fresh."
            ]
        },
        {
            id: 5,
            title: "Chocolate Cake",
            description: "Rich and moist chocolate cake with frosting.",
            image:
                "https://www.oogio.net/wp-content/uploads/2018/11/American_chocolate_cake6-s.jpg",
            ingredients: [
                "Flour",
                "Cocoa powder",
                "Sugar",
                "Butter",
                "Milk"
            ],
            instructions: [
                "Mix dry ingredients.",
                "Add butter & milk.",
                "Bake at 180°C for 35 mins.",
                "Cool & add frosting."
            ]
        },
        {
            id: 6,
            title: "Sushi Platter",
            description: "Fresh sushi rolls with salmon, tuna, and veggies.",
            image:
                "https://tse4.mm.bing.net/th/id/OIP.hX-6gzvgC5Xahc4vw-zQqAHaJ4?rs=1&pid=ImgDetMain",
            ingredients: [
                "Sushi rice",
                "Nori sheets",
                "Salmon",
                "Tuna",
                "Vegetables"
            ],
            instructions: [
                "Cook sushi rice.",
                "Place rice on nori sheet.",
                "Add fillings.",
                "Roll tightly & slice."
            ]
        },
        {
            id: 7,
            title: "Pancakes Stack",
            description: "Fluffy pancakes topped with syrup and fruits.",
            image:
                "https://png.pngtree.com/thumb_back/fh260/background/20230521/pngtree-stack-of-pancakes-covered-in-berries-is-on-a-table-image_2679332.jpg",
            ingredients: [
                "Flour",
                "Eggs",
                "Milk",
                "Sugar",
                "Baking powder"
            ],
            instructions: [
                "Mix all ingredients.",
                "Cook on non-stick pan.",
                "Flip until golden.",
                "Top with fruits & syrup."
            ]
        },
        {
            id: 8,
            title: "Mediterranean Bowl",
            description: "Healthy grains, veggies, and protein-rich toppings.",
            image:
                "https://i.pinimg.com/originals/38/fb/7d/38fb7d073f3ac1481d65572b07a9afd1.jpg",
            ingredients: [
                "Brown rice",
                "Chickpeas",
                "Cucumber",
                "Tomatoes",
                "Hummus"
            ],
            instructions: [
                "Cook brown rice.",
                "Chop veggies.",
                "Add all items in a bowl.",
                "Top with hummus."
            ]
        }
    ];

    const [backendRecipes, setBackendRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const data = await getAllRecipes();
            setBackendRecipes(Array.isArray(data.recipes) ? data.recipes : []);
        } catch (err) {
            console.error("Failed to load recipes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [location.pathname]);

    const pageStyle = {
        padding: "4rem 2rem",
        maxWidth: "1200px",
        margin: "auto",
        backgroundColor: "#fafafa",
        fontFamily: "'Poppins', sans-serif",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
    };

    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    };

    const buttonStyle = {
        padding: "10px 12px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        fontWeight: 900,
        backgroundColor: "#f52727ff",  // 🔴 RED BUTTON
        color: "#fff",
    };

    return (
        <section style={pageStyle}>
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "3rem",
                    fontSize: "2.5rem",
                    color: "#ff4b4b",
                    fontWeight: 700,
                }}
            >
                All Recipes
            </h1>

            {loading && <p>Loading recipes...</p>}

            <div style={gridStyle}>
                {/* STATIC RECIPES */}
                {staticRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}

                {/* BACKEND RECIPES */}
                {backendRecipes.map((recipe) => (
                    <div key={recipe._id} style={cardStyle}>
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            style={{
                                width: "100%",
                                height: 180,
                                objectFit: "cover",
                                borderRadius: 8,
                                marginBottom: 10,
                            }}
                        />

                        <h3 style={{ marginBottom: 6 }}>{recipe.title}</h3>
                        <p style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>
                            {recipe.description}
                        </p>

                        <button
                            style={buttonStyle}
                            onClick={() => navigate(`/recipe/${recipe._id}`)}
                        >
                            <h3>View Recipe</h3>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recipes;
