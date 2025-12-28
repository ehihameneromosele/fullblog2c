import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, getCategories } from "../../api/blog";
import Hero from "../../components/Common/Hero";
import Categories from "../../components/Blog/Categories";
import RecentPosts from "../../components/Blog/RecentPosts";
import BlogCard from "../../components/Blog/BlogCard";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories(),
        ]);
        setPosts(Array.isArray(postsData) ? postsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <Hero
        title="Welcome to Our Blog"
        subtitle="Insights, stories, and ideas that matter — discover your next favorite read."
        compact
      >
        <a href="#categories" className="hero-btn">
          Explore Categories
        </a>
      </Hero>

      {/* Categories Section */}
      <section
        id="categories"
        className="dashboard-section"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Categories categories={categories} loading={loading} />
      </section>

      {/* Recent Posts Slider */}
      <section
        className="dashboard-section"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div className="posts-header">
          <h2 className="section-title">Recent Posts</h2>
        </div>
        <RecentPosts posts={posts.slice(0, 6)} />
      </section>

      {/* All Blog Posts Grid */}
      <section
        className="dashboard-section"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="posts-header">
          <h2 className="section-title">All Blog Posts</h2>

          {user && (user?.is_blog_admin || user?.role === "admin") && (
            <button
              className="create-post-btn"
              onClick={() => navigate("/blog/create")}
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              + Create New Post
            </button>
          )}
        </div>

        <div className="posts-grid">
          {(showAll ? posts : posts.slice(0, 6)).map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              data-aos="fade-up"
              data-aos-delay={300 + index * 50}
            />
          ))}
        </div>

        {posts.length > 6 && (
          <div
            className="show-more"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <button
              className="view-all-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Posts →"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogDashboard;