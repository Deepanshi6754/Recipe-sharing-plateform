

// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//     login as apiLogin,
//     signup as apiSignup,
//     fetchUserProfile,
// } from "../services/api";

// const AuthContext = createContext();

// // Hook
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem("user");
//         return savedUser ? JSON.parse(savedUser) : null;
//     });

//     const [token, setToken] = useState(() => localStorage.getItem("token"));
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch profile automatically if token exists
//     useEffect(() => {
//         let mounted = true;

//         const loadProfile = async () => {
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const profile = await fetchUserProfile();
//                 if (mounted && profile) {
//                     setUser(profile);
//                     localStorage.setItem("user", JSON.stringify(profile));
//                 }
//             } catch (err) {
//                 console.error("Profile fetch failed:", err);
//                 logout();
//             } finally {
//                 if (mounted) setLoading(false);
//             }
//         };

//         loadProfile();
//         return () => (mounted = false);
//     }, [token]);

//     // LOGIN
//     const login = async ({ email, password }) => {
//         setError(null);
//         setLoading(true);

//         try {
//             const data = await apiLogin({ email, password });

//             if (!data?.token || !data?.user) {
//                 throw new Error("Invalid login response from server");
//             }

//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));

//             setToken(data.token);
//             setUser(data.user);
//         } catch (err) {
//             const msg = err?.message || "Login failed.";
//             setError(msg);
//             throw new Error(msg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // SIGNUP
//     const signup = async ({ name, email, password }) => {
//         setError(null);
//         setLoading(true);

//         try {
//             const data = await apiSignup({ name, email, password });

//             if (data?.token && data?.user) {
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("user", JSON.stringify(data.user));

//                 setToken(data.token);
//                 setUser(data.user);
//             }
//         } catch (err) {
//             const msg = err?.message || "Signup failed.";
//             setError(msg);
//             throw new Error(msg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // LOGOUT
//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setToken(null);
//         setUser(null);
//     };

//     // PROVIDER VALUES
//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 setUser, // IMPORTANT
//                 token,
//                 setToken, // IMPORTANT
//                 login,
//                 signup,
//                 logout,
//                 loading,
//                 error,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };



//mera code

import React, { createContext, useContext, useState, useEffect } from "react";
import {
    login as apiLogin,
    signup as apiSignup,
    fetchUserProfile,
} from "../services/api";

const AuthContext = createContext();

// Hook
export const useAuth = () => useContext(AuthContext);

// Helper: check if JWT token is not expired
const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.exp) return true; // if no exp, assume valid
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (err) {
        return false;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        try {
            const t = localStorage.getItem("token");
            return t && isTokenValid(t) ? t : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // keep localStorage in sync when user/token changes
    useEffect(() => {
        try {
            if (token) localStorage.setItem("token", token);
            else localStorage.removeItem("token");
        } catch { }
    }, [token]);

    useEffect(() => {
        try {
            if (user) localStorage.setItem("user", JSON.stringify(user));
            else localStorage.removeItem("user");
        } catch { }
    }, [user]);

    // Fetch profile automatically if token exists on mount
    useEffect(() => {
        let mounted = true;

        const loadProfile = async () => {
            if (!token) {
                if (mounted) setLoading(false);
                return;
            }

            try {
                const profile = await fetchUserProfile();
                if (mounted && profile) {
                    setUser(profile);
                }
            } catch (err) {
                console.error("Profile fetch failed:", err);
                // token might be invalid/expired — clear auth
                logout();
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadProfile();
        return () => (mounted = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // LOGIN
    const login = async ({ email, password }) => {
        setError(null);
        setLoading(true);

        try {
            const data = await apiLogin({ email, password });

            if (!data?.token || !data?.user) {
                throw new Error("Invalid login response from server");
            }

            setToken(data.token);
            setUser(data.user);

            // persist
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return data;
        } catch (err) {
            const msg = err?.message || "Login failed.";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // SIGNUP
    const signup = async ({ name, email, password }) => {
        setError(null);
        setLoading(true);

        try {
            const data = await apiSignup({ name, email, password });

            if (data?.token && data?.user) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            return data;
        } catch (err) {
            const msg = err?.message || "Signup failed.";
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT
    const logout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } catch { }
        setToken(null);
        setUser(null);
    };

    // helper to refresh user profile manually
    const refreshProfile = async () => {
        if (!token) return null;
        try {
            const profile = await fetchUserProfile();
            if (profile) {
                setUser(profile);
                localStorage.setItem("user", JSON.stringify(profile));
            }
            return profile;
        } catch (err) {
            console.error("Refresh profile failed:", err);
            return null;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                login,
                signup,
                logout,
                loading,
                error,
                refreshProfile,
                isAuthenticated: Boolean(user && token),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
