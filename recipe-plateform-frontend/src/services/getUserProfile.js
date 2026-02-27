export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please login again.");
    }

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    try {
        const response = await fetch(`${apiUrl}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Parse JSON safely
        let data;
        try {
            data = await response.json();
        } catch {
            throw new Error("Server returned invalid JSON");
        }

        // Handle backend errors
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                throw new Error("Unauthorized: Please login again.");
            }

            throw new Error(
                data?.message ||
                data?.errors?.join(", ") ||
                "Failed to fetch profile"
            );
        }

        // Always return user data safely
        return data?.user || data;
    } catch (error) {
        console.error("fetchUserProfile error:", error);
        throw new Error(error?.message || "Something went wrong while fetching profile");
    }
};
