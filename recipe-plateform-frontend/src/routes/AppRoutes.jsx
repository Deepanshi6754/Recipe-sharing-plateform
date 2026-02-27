// // src/routes/AppRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Public Pages
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import SearchResults from "../pages/SearchResults";
// import RecipeDetails from "../pages/RecipeDetails";
// import Signup from "../pages/Signup";
// import Login from "../pages/Login";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";
// import NotFound from "../pages/NotFound";

// // Protected Pages
// import Home from "../pages/Home";
// import Recipes from "../pages/Recipes";
// import Profile from "../pages/Profile";
// import Favorites from "../pages/Favorites";
// import ShareRecipe from "../pages/ShareRecipe";
// import Admin from "../pages/Admin";

// // Unauthorized Page
// import Unauthorized from "../pages/Unauthorized";

// // Route Guard
// import ProtectedRoute from "./ProtectedRoute";

// const AppRoutes = () => {
//     return (
//         <Routes>
//             {/* Public Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/search" element={<SearchResults />} />

//             {/* Recipes pages are public */}
//             <Route path="/recipes" element={<Recipes />} />
//             <Route path="/recipe/:id" element={<RecipeDetails />} />

//             {/* Auth Routes */}
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />

//             {/* Protected Pages */}
//             <Route
//                 path="/share"
//                 element={
//                     <ProtectedRoute>
//                         <ShareRecipe />
//                     </ProtectedRoute>
//                 }
//             />
//             <Route
//                 path="/profile"
//                 element={
//                     <ProtectedRoute>
//                         <Profile />
//                     </ProtectedRoute>
//                 }
//             />
//             <Route
//                 path="/favorites"
//                 element={
//                     <ProtectedRoute>
//                         <Favorites />
//                     </ProtectedRoute>
//                 }
//             />

//             {/* Admin */}
//             <Route
//                 path="/admin"
//                 element={
//                     <ProtectedRoute requiredRole="admin">
//                         <Admin />
//                     </ProtectedRoute>
//                 }
//             />

//             {/* Unauthorized */}
//             <Route path="/unauthorized" element={<Unauthorized />} />

//             {/* 404 */}
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// };

// export default AppRoutes;

// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import About from "../pages/About";
import Blogs from "../pages/Blogs"; // List all blogs
import AddBlog from "../pages/AddBlog"; // New page for adding a blog
import SearchResults from "../pages/SearchResults";
import RecipeDetails from "../pages/RecipeDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";

// Protected Pages
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";
import ShareRecipe from "../pages/ShareRecipe";
import Admin from "../pages/Admin";

// Unauthorized Page
import Unauthorized from "../pages/Unauthorized";

// Route Guard
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} /> {/* View all blogs */}

            {/* Add Blog - Protected */}
            <Route
                path="/add-blog"
                element={
                    <ProtectedRoute>
                        <AddBlog />
                    </ProtectedRoute>
                }
            />

            <Route path="/search" element={<SearchResults />} />

            {/* Recipes pages are public */}
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />

            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Pages */}
            <Route
                path="/share"
                element={
                    <ProtectedRoute>
                        <ShareRecipe />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/favorites"
                element={
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <Admin />
                    </ProtectedRoute>
                }
            />

            {/* Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
