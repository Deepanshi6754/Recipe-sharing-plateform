


const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ---------------- HEADERS ---------------- */

// JSON headers (for non-form requests)
const getJSONHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// FormData headers (browser sets Content-Type automatically)
const getFormHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/* ---------------- RESPONSE HANDLER ---------------- */
const handleResponse = async (res, fallbackMessage = "Request failed") => {
  let data = null;
  const text = await res.text().catch(() => "");
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = (data && data.message) || fallbackMessage;
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("Unauthorized: Please login again.");
    }
    throw new Error(message);
  }

  return data || {};
};

/* ---------------- HELPERS ---------------- */
const buildQueryString = (params = {}) => {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return q ? `?${q}` : "";
};

/* ---------------- SUBSCRIBERS ---------------- */
export const subscribe = async (email) => {
  const res = await fetch(`${apiUrl}/subscribers`, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
};

export const getSubscriberCount = async () => {
  const res = await fetch(`${apiUrl}/subscribers/count`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data.count;
};

/* ---------------- AUTH ---------------- */
export const signup = async ({ name, email, password }) => {
  const res = await fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const fetchUserProfile = async () => {
  const res = await fetch(`${apiUrl}/users/me`, {
    method: "GET",
    headers: getJSONHeaders(), // use JSON headers to include token
  });
  const data = await handleResponse(res);
  return data.user || null;
};

export const updateProfile = async (profileData) => {
  const isFormData = profileData instanceof FormData;
  const res = await fetch(`${apiUrl}/users/me`, {
    method: "PUT",
    headers: isFormData ? getFormHeaders() : getJSONHeaders(),
    body: isFormData ? profileData : JSON.stringify(profileData),
  });
  const data = await handleResponse(res);
  return data.user || null;
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${apiUrl}/auth/forgot-password`, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
};

export const resetPassword = async (token, password) => {
  const res = await fetch(`${apiUrl}/auth/reset-password/${token}`, {
    method: "POST",
    headers: getJSONHeaders(),
    body: JSON.stringify({ password }),
  });
  return handleResponse(res);
};

/* ---------------- RECIPES ---------------- */
// Get all recipes with optional params: { q, page, limit, sort }
export const getAllRecipes = async (params = {}) => {
  const qs = buildQueryString(params);
  const res = await fetch(`${apiUrl}/recipes${qs}`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  // backend returns { recipes, total, page, limit }
  return data;
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${apiUrl}/recipes/${id}`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data.recipe;
};

export const getUserRecipes = async (userId) => {
  const res = await fetch(`${apiUrl}/recipes/user/${userId}`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data.recipes;
};

export const createRecipe = async (recipeData) => {
  const isFormData = recipeData instanceof FormData;
  const res = await fetch(`${apiUrl}/recipes`, {
    method: "POST",
    headers: isFormData ? getFormHeaders() : getJSONHeaders(),
    body: isFormData ? recipeData : JSON.stringify(recipeData),
  });
  const data = await handleResponse(res);
  return data.recipe;
};

export const updateRecipe = async (id, recipeData) => {
  const isFormData = recipeData instanceof FormData;
  const res = await fetch(`${apiUrl}/recipes/${id}`, {
    method: "PUT",
    headers: isFormData ? getFormHeaders() : getJSONHeaders(),
    body: isFormData ? recipeData : JSON.stringify(recipeData),
  });
  const data = await handleResponse(res);
  return data.recipe;
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${apiUrl}/recipes/${id}`, {
    method: "DELETE",
    headers: getJSONHeaders(),
  });
  return handleResponse(res);
};

// Favorites (depends on backend implementation)
export const getFavorites = async () => {
  const res = await fetch(`${apiUrl}/recipes/favorites`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data.favorites;
};

export const toggleFavorite = async (recipeId) => {
  const res = await fetch(`${apiUrl}/recipes/${recipeId}/favorite`, {
    method: "POST",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data;
};

export const searchRecipes = async (query, params = {}) => {
  // Backend supports text search via ?q=... on GET /recipes
  const qs = buildQueryString({ q: query, ...params });
  const res = await fetch(`${apiUrl}/recipes${qs}`, {
    method: "GET",
    headers: getJSONHeaders(),
  });
  const data = await handleResponse(res);
  return data;
};

const api = {
  subscribe,
  getSubscriberCount,
  signup,
  login,
  fetchUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllRecipes,
  getRecipeById,
  getUserRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getFavorites,
  toggleFavorite,
  searchRecipes,
};

export default api;
