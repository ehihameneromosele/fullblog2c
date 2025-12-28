import { Link } from "react-router-dom";
import { Calendar, User, Heart, MessageCircle, Tag } from "lucide-react";
import "./BlogCard.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getImageUrl } from '../../api/config.js';

const BlogCard = ({ post, admin = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  // Handle image URL - FIXED for Vite
  const imageUrl = getImageUrl(post.image)

  // Strip HTML + create excerpt
  const contentExcerpt = post.content
    ? post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
    : "No content available...";

  return (
    <div 
      className={`blog-card ${admin ? "admin" : ""} ${isHovered ? "hovered" : ""}`}
      data-aos="fade-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blog Image */}
      {post.image && (
        <div className="blog-card-image-container">
          <img
            src={imageUrl}
            alt={post.title || "Blog post image"}
            className="blog-card-image"
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              e.target.style.display = "none";
            }}
          />
          <div className="image-overlay"></div>
        </div>
      )}

      <div className="blog-card-content">
        {/* Category */}
        <div className="blog-card-category">
          <Tag size={14} />
          {post.category ? (
            <Link to={`/categories/${post.category.id}`}>
              {post.category.title || post.category.name}
            </Link>
          ) : (
            <span>Uncategorized</span>
          )}
        </div>

        {/* Title */}
        <h3 className="blog-card-title">
          <Link to={admin ? `/admin/posts/${post.id}` : `/blog/${post.id}`}>
            {post.title || "Untitled Post"}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="blog-card-excerpt">{contentExcerpt}</p>

        {/* Meta Info */}
        <div className="blog-card-meta">
          <div className="meta-item">
            <User size={14} />
            <span>{post.author?.username || "Unknown Author"}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "No date"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="blog-card-stats">
          <div className="stat-item">
            <Heart size={16} />
            <span>{post.likes_count || 0}</span>
          </div>
          <div className="btn">
            <Link
              to={admin ? `/admin/posts/${post.id}` : `/blog/${post.id}`}
              className="btn btn-secondary"
            >
              Read More →
            </Link>
          </div>
          <div className="stat-item">
            <MessageCircle size={16} />
            <span>{post.comments_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;