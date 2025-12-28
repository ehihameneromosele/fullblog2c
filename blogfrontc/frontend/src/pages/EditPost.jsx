import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../api/blog"; // adjust path if needed

const EditPost = () => {
  const { id } = useParams(); // post id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch post data when component loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(id); // /api/posts/:id/
        setFormData({
          title: res.title,
          content: res.content,
          category: res.category || "",
          image: null, // don't preload image field
        });
      } catch (err) {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.category) data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      await updatePost(id, data);
      navigate(`/blog/${id}`); // back to post detail
    } catch (err) {
      setError("Failed to update post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload New Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
