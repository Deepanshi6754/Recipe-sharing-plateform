import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/api";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { showToast } = useToast();
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const previewRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  if (!user) return <Loader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      showToast("File must be under 2MB", "error");
      return;
    }
    setAvatarFile(file);

    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = file ? URL.createObjectURL(file) : null;
    previewRef.current = url;
    setPreview(url);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let payload;
      if (avatarFile) {
        const fd = new FormData();
        fd.append("name", user.name);
        fd.append("bio", user.bio || "");
        fd.append("avatar", avatarFile);
        payload = fd;
      } else {
        payload = { name: user.name, bio: user.bio || "" };
      }

      const updatedUser = await updateProfile(payload);

      const newUser = {
        ...user,
        ...updatedUser,
        avatar: preview || updatedUser.avatar,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      setEditMode(false);
      setAvatarFile(null);
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
      setPreview(null);

      showToast("Profile updated successfully!", "success");
    } catch (err) {
      console.error("Save profile failed:", err);
      showToast(err.message || "Failed to update profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const stringToColor = (str) => {
    if (!str) return "#ccc";
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${Math.abs(hash) % 360}, 65%, 55%)`;
  };

  const styles = {
    container: { maxWidth: "900px", margin: "4rem auto", padding: "0 1rem", fontFamily: "'Poppins', sans-serif" },
    card: {
      display: "flex",
      flexDirection: "row",
      gap: "2rem",
      background: "#fff",
      padding: "2.5rem",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      flexWrap: "wrap",
    },
    left: { flex: "1 1 250px", textAlign: "center" },
    right: { flex: "2 1 400px" },
    avatar: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      border: "5px solid #ff4b4b",
      objectFit: "cover",
      margin: "0 auto 1rem",
    },
    avatarPlaceholder: (bg) => ({
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      backgroundColor: bg,
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",
      margin: "0 auto 1rem",
    }),
    name: { fontSize: "2rem", fontWeight: "700", color: "#ff4b4b", marginBottom: "0.5rem" },
    email: { fontSize: "0.95rem", color: "#666", marginBottom: "1rem" },
    bio: { fontSize: "1rem", color: "#444", lineHeight: "1.6", marginBottom: "1.5rem" },
    button: {
      backgroundColor: "#ff4b4b",
      color: "#fff",
      padding: "0.8rem 1.6rem",
      borderRadius: "12px",
      cursor: "pointer",
      border: "none",
      fontWeight: 600,
      transition: "0.3s",
    },
    secondaryBtn: {
      backgroundColor: "#777",
      color: "#fff",
      padding: "0.8rem 1.6rem",
      borderRadius: "12px",
      cursor: "pointer",
      border: "none",
      fontWeight: 600,
      transition: "0.3s",
    },
    formInput: {
      padding: "1rem",
      borderRadius: "12px",
      border: "1px solid #ddd",
      width: "100%",
      boxSizing: "border-box",
      marginBottom: "1rem",
      fontSize: "0.95rem",
    },
    fileInputLabel: {
      display: "inline-block",
      padding: "0.8rem 1.6rem",
      borderRadius: "12px",
      backgroundColor: "#ff4b4b",
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer",
      marginBottom: "1rem",
      textAlign: "center",
      transition: "0.3s",
    },
    fileInputLabelHover: { backgroundColor: "#e03e3e" },
    fileInputHidden: { display: "none" },
    buttonContainer: { display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "flex-start" },
    responsive: `@media (max-width: 768px) {
      div[style*="flex-wrap"] {
        flex-direction: column;
        align-items: center;
      }
      div[style*="flex:2 1 400px"] {
        width: 100% !important;
      }
    }`,
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.left}>
          {preview || user.avatar ? (
            <img src={preview || user.avatar} style={styles.avatar} alt="avatar" />
          ) : (
            <div style={styles.avatarPlaceholder(stringToColor(user.name))}>
              {user.name?.charAt(0) || "U"}
            </div>
          )}
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>
          <p style={styles.bio}>{user.bio || "No bio added yet."}</p>
          {!editMode && (
            <button style={styles.button} onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Right Panel - Edit Mode */}
        {editMode && (
          <div style={styles.right}>
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                placeholder="Your name"
                style={styles.formInput}
              />
              <textarea
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                placeholder="Short bio"
                style={{ ...styles.formInput, height: "120px" }}
              />

              {/* Custom Choose File Button */}
              <label style={styles.fileInputLabel}>
                {avatarFile ? "Image Selected" : "Choose Profile Image"}
                <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInputHidden} />
              </label>

              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.button} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  style={styles.secondaryBtn}
                  onClick={() => {
                    setEditMode(false);
                    setAvatarFile(null);
                    if (previewRef.current) {
                      URL.revokeObjectURL(previewRef.current);
                      previewRef.current = null;
                    }
                    setPreview(null);
                    setUser(JSON.parse(localStorage.getItem("user")) || user);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <style>{styles.responsive}</style>
    </div>
  );
}
