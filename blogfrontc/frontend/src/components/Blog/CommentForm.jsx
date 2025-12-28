import { useState, useEffect } from "react";
import "./CommentForm.css";

const CommentForm = ({ 
  onSubmit, 
  isSubmitting, 
  initialValue = "", 
  isEditing = false, 
  onCancel 
}) => {
  const [comment, setComment] = useState(initialValue);

  useEffect(() => {
    setComment(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      if (!isEditing) setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        required
        rows="3"
      />
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (isEditing ? "Saving..." : "Posting...") 
            : (isEditing ? "Save Changes" : "Post Comment")}
        </button>
        {isEditing && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;