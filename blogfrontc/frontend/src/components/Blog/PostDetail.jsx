import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import {
  deletePost,
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../api/blog";
import { useAuth } from "../../context/AuthContext";
import CommentForm from "../Blog/CommentForm";
import Comment from "../Blog/Comment";
import "./PostDetail.css";

const PostDetail = ({ post, onLike }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const loadComments = async () => {
    try {
      setIsLoadingComments(true);
      const data = await getComments(post.id);
      setComments(data);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleLike = () => {
    onLike();
    setIsLiked(!isLiked);
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
        navigate("/blog");
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  const handleAddComment = async (body) => {
    setIsSubmitting(true);
    try {
      await addComment(post.id, body);
      await loadComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (id, body) => {
    setIsSubmitting(true);
    try {
      await updateComment(id, body);
      setEditingCommentId(null);
      await loadComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(id);
        await loadComments();
      } catch (err) {
        console.error("Failed to delete comment:", err);
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
  };

  // If we're loading the main post content, show full page spinner
  if (!post) {
    return (
      <div className="post-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <article className="post-detail">
      {post.image && (
        <div className="post-image-container">
          <img 
            src={post.image} 
            alt={post.title} 
            className="post-image"
            loading="lazy"
          />
        </div>
      )}
      
      <header className="post-header">
        {post.category && (
          <div className="category-badge">{post.category.name}</div>
        )}
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <div className="author-info">
            <div className="author-avatar">
              {post.author.username.charAt(0).toUpperCase()}
            </div>
            <div className="author-details">
              <span className="post-author">By {post.author.username}</span>
              <span className="post-date">
                {format(new Date(post.created_at), "MMMM d, yyyy")}
                {" • "}
                {formatDistanceToNow(new Date(post.created_at))} ago
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="post-footer">
        <div className="post-stats">
          <button
            onClick={handleLike}
            className={`like-btn ${isLiked ? "liked" : ""}`}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <span className="like-icon">
              {isLiked ? "❤️" : "🤍"}
            </span>
            <span className="like-text">
              {isLiked ? "Liked" : "Like"} ({post.likes_count || 0})
            </span>
          </button>
          
          <div className="comment-stat">
            <span className="comment-icon">💬</span>
            <span className="comment-count">{comments.length} Comments</span>
          </div>
        </div>

        {(user?.id === post.author.id || user?.is_blog_admin) && (
          <div className="post-actions">
            <button
              onClick={() => navigate(`/blog/${post.id}/edit`)}
              className="action-btn edit-btn"
            >
              Edit Post
            </button>
            <button
              onClick={handleDeletePost}
              className="action-btn delete-btn"
            >
              Delete Post
            </button>
          </div>
        )}
      </footer>

      <section className="comments-section">
        <div className="comments-header">
          <h3>Comments ({comments.length})</h3>
          <button 
            className="refresh-btn"
            onClick={loadComments}
            disabled={isLoadingComments}
            aria-label="Refresh comments"
          >
            ↻
          </button>
        </div>

        <CommentForm 
          onSubmit={handleAddComment} 
          isSubmitting={isSubmitting}
          placeholder="Share your thoughts..."
        />
        
        <div className="comments-list">
          {isLoadingComments ? (
            <div className="comments-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="no-comments">
              <h4>No comments yet</h4>
              <p>Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              editingCommentId === comment.id ? (
                <div key={comment.id} className="comment-edit-form">
                  <CommentForm
                    onSubmit={(body) => handleUpdateComment(comment.id, body)}
                    initialValue={comment.body}
                    isEditing={true}
                    isSubmitting={isSubmitting}
                    onCancel={() => setEditingCommentId(null)}
                  />
                </div>
              ) : (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  currentUser={user}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                />
              )
            ))
          )}
        </div>
      </section>
    </article>
  );
};

export default PostDetail;