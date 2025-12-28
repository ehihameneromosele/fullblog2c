import { format } from 'date-fns';
import './Comment.css';

const Comment = ({ comment }) => {
  // ✅ Handle both comment structures (direct object or nested in data)
  const commentData = comment.comment || comment;
  
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">
          {commentData.user?.username || 'Unknown User'}
        </span>
        <span className="comment-date">
          {format(new Date(commentData.created_at), 'MMMM d, yyyy')}
        </span>
      </div>
      <div className="comment-body">
        <p>{commentData.body}</p>
      </div>
    </div>
  );
};

export default Comment;