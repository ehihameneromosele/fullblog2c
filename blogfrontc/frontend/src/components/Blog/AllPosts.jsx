// AllPosts.jsx
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getPosts, getCategories } from "../../api/blog";
import BlogCard from "../../components/Blog/BlogCard";
import { AuthContext } from "../../context/AuthContext";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories(),
        ]);
        
        const results = Array.isArray(postsData)
          ? postsData
          : postsData?.results || [];
          
        setPosts(results);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  if (loading) {
    return (
      <div className="all-posts-loading">
        <div className="all-posts-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="all-posts-container">
      {/* Hero Section */}
      <div className="all-posts-hero">
        <div className="all-posts-hero-content">
          <h1>Our Blog</h1>
          <p>Discover insights, stories, and ideas from our creative community</p>
        </div>
      </div>

      <div className="all-posts-content">
        {/* Page Header */}
        <div className="all-posts-header">
          <h2>All Blog Posts</h2>
          <p>Explore our complete collection of articles and insights</p>
        </div>

        {/* Category Filters */}
        <div className="all-posts-categories">
          <div className="category-filters-container">
            <button 
              className={`category-filter ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="all-posts-grid-container">
          {filteredPosts.length > 0 ? (
            <div className="all-posts-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="all-posts-empty">
              <div className="empty-state">
                <h3>No posts found</h3>
                <p>No posts available {selectedCategory ? "in this category" : "yet"}.</p>
                {selectedCategory && (
                  <button 
                    className="clear-filter-btn"
                    onClick={() => setSelectedCategory(null)}
                  >
                    View All Posts
                  </button>
                )}
                <Link to="/" className="home-link">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;