// src/components/TestAPI.jsx
import { useEffect, useState } from 'react';
import { getPosts, getCategories } from '../api/blog.js'; // Adjust path if needed

export default function TestAPI() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        
        // Test posts endpoint
        const postsData = await getPosts();
        console.log('Posts data:', postsData);
        setPosts(postsData);
        
        // Test categories endpoint
        const categoriesData = await getCategories();
        console.log('Categories data:', categoriesData);
        setCategories(categoriesData);
        
      } catch (err) {
        console.error('API test failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div>Testing API connection...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div style={{padding: '20px'}}>
      <h2>API Connection Test</h2>
      <p>✅ Successfully connected to API!</p>
      <p>Posts loaded: {posts.length}</p>
      <p>Categories loaded: {categories.length}</p>
      
      {/* Optional: Show some data */}
      {posts.length > 0 && (
        <div>
          <h3>First Post Preview:</h3>
          <pre>{JSON.stringify(posts[0], null, 2)}</pre>
        </div>
      )}
    </div>
  );
}