// --- API Configuration ---
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://blogbackc-ch.onrender.com/api/";

export const API_DOMAIN = API_BASE_URL.replace("/api/", ""); // For media/image URLs

export const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL || "https://subtle-blini-446f27.netlify.app";
// --- Endpoints ---
export const POSTS_URL = `${API_BASE_URL}posts/`;
export const CATEGORIES_URL = `${API_BASE_URL}categories/`;
export const COMMENTS_URL = `${API_BASE_URL}comments/`; // ✅ added for update/delete comments
export const LOGIN_URL = `${API_BASE_URL}login/`;
export const REGISTER_URL = `${API_BASE_URL}register/`;
export const TOKEN_REFRESH_URL = `${API_BASE_URL}token/refresh/`;

// --- Frontend Configuration ---

// --- Image Helper Function ---
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Ignore invalid/text "images"
  if (
    imagePath.endsWith(".txt") ||
    !imagePath.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
  ) {
    return null;
  }

  // Already full URL → return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // S3 links → return as is
  if (imagePath.includes("s3.eu-north-1.amazonaws.com")) {
    return imagePath;
  }

  // Media paths served by Django → prepend API_DOMAIN
  if (imagePath.startsWith("/media/")) {
    return `${API_DOMAIN}${imagePath}`;
  }

  // Default → construct media path
  return `${API_DOMAIN}/media/${imagePath}`;
};

// --- Debug Helper ---
export const debugImageUrl = (imagePath) => {
  const url = getImageUrl(imagePath);
  console.log("Image debug:", {
    original: imagePath,
    finalUrl: url,
    apiBase: API_BASE_URL,
    apiDomain: API_DOMAIN,
  });
  return url;
};
