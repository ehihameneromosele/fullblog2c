import { useState, useEffect } from 'react';
import { getPosts, createPost, getCategories } from '../../api/blog';
import BlogForm from '../../components/Blog/BlogForm';
import BlogCard from '../../components/Blog/BlogCard';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      setPosts([newPost, ...posts]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
        {showForm ? 'Cancel' : 'Create New Post'}
      </button>
      {showForm && (
        <BlogForm categories={categories} onSubmit={handleCreatePost} />
      )}
      <div className="admin-posts">
        <h2>All Posts</h2>
        <div className="posts-list">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} admin />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;