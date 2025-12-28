import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryDetails } from "../../api/blog";
import BlogCard from "../../components/Blog/BlogCard";
import "./CategoryDetail.css";  // ✅ bring in styles

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryDetails(id);
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) return <p className="loading-msg">Loading...</p>;
  if (!category) return <p className="error-msg">Category not found</p>;

  return (
    <div className="category-detail">
      <header className="category-header">
        <h2 className="category-title">{category.name}</h2>
        <div className="category-stats">
          <span>📝 {category.total_posts} Posts</span>
          <span>💬 {category.total_comments} Comments</span>
          <span>❤️ {category.total_likes} Likes</span>
        </div>
      </header>

      <section className="category-posts">
        <h3 className="section-title">Posts in this Category</h3>
        <div className="posts-grid">
          {category.posts.length > 0 ? (
            category.posts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <p className="no-posts">No posts yet in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;
