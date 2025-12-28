// api/blog.js
import api from "./axios.js";
import {
  POSTS_URL,
  CATEGORIES_URL,
  COMMENTS_URL,
} from "./config.js";

// --- Posts ---
export const getPosts = async () => {
  try {
    const res = await api.get(POSTS_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPost = async (id) => {
  try {
    const res = await api.get(`${POSTS_URL}${id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const res = await api.post(POSTS_URL, postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const res = await api.put(`${POSTS_URL}${id}/`, postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await api.delete(`${POSTS_URL}${id}/`);
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
};

// --- Categories ---
export const getCategories = async () => {
  try {
    const res = await api.get(CATEGORIES_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching categories:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error fetching categories:", error.message);
    }
    return [];
  }
};

export const getCategoryDetails = async (id) => {
  try {
    const res = await api.get(`${CATEGORIES_URL}${id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

// --- Likes ---
export const toggleLike = async (postId) => {
  try {
    const res = await api.post(`${POSTS_URL}${postId}/like-toggle/`);
    return res.data;
  } catch (error) {
    console.error(`Error toggling like on post ${postId}:`, error);
    throw error;
  }
};

// --- Comments ---
export const getComments = async (postId) => {
  try {
    const res = await api.get(`${POSTS_URL}${postId}/comments/`);
    // ✅ Handle different response structures
    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.results)) {
      return res.data.results;
    } else if (res.data && Array.isArray(res.data.comments)) {
      return res.data.comments;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

export const addComment = async (postId, body) => {
  try {
    const res = await api.post(`${POSTS_URL}${postId}/comments/`, { body });
    return res.data;
  } catch (error) {
    console.error(`Error adding comment to post ${postId}:`, error);
    throw error;
  }
};

export const updateComment = async (commentId, body) => {
  try {
    const res = await api.put(`${COMMENTS_URL}${commentId}/`, { body });
    return res.data;
  } catch (error) {
    console.error(`Error updating comment ${commentId}:`, error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await api.delete(`${COMMENTS_URL}${commentId}/`);
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
};
