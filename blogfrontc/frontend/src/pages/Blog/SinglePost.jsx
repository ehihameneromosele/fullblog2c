import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, toggleLike, getComments, addComment, updateComment, deleteComment } from "../../api/blog";
import PostDetail from "../../components/Blog/PostDetail";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isValidPostId = id && !isNaN(Number(id));

  useEffect(() => {
    if (!isValidPostId) return;

    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        console.error("Error loading post or comments", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isValidPostId]);

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
      const updatedPost = await getPost(id);
      setPost(updatedPost);
    } catch (err) {
      setError("Failed to toggle like");
    }
  };

  const handleAddComment = async (body) => {
    try {
      await addComment(post.id, body);
      // Refresh comments after adding
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (err) {
      console.error("Failed to add comment:", err);
      setError("Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId, body) => {
    try {
      await updateComment(commentId, body);
      // Refresh comments after updating
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (err) {
      console.error("Failed to update comment:", err);
      setError("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      // Refresh comments after deleting
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setError("Failed to delete comment");
    }
  };

  if (!isValidPostId) return null;
  
  if (loading) {
    return (
      <div className="singlepost-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="single-post-container">
      <PostDetail 
        post={post} 
        comments={comments}
        onLike={handleLike}
        onAddComment={handleAddComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default SinglePost;