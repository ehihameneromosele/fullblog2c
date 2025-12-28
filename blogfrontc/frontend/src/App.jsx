import { 
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Common/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BlogDashboard from "./pages/Blog/Dashboard";
import BlogForm from "./components/Blog/BlogForm";
import AllPosts from "./components/Blog/AllPosts";
import SinglePost from "./pages/Blog/SinglePost";
// import ManagePost from "./pages/Blog/ManagePost";
import CategoryDetail from "./pages/Blog/CategoryDetail";
import AdminDashboard from "./pages/Admin/Dashboard";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/Common/PrivateRoute";
import { getCategories, getPost, createPost, updatePost } from "./api/blog";
import "./theme.css";

// ✅ Create Wrapper
function CreatePostWrapper() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const handleBlogSubmit = async (formData) => {
    setLoading(true);
    try {
      await createPost(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogForm
      categories={categories}
      onSubmit={handleBlogSubmit}
      isSubmitting={loading}
    />
  );
}

// ✅ Edit Wrapper
function EditPostWrapper() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, postData] = await Promise.all([
          getCategories(),
          getPost(id),
        ]);
        setCategories(categoriesData);
        setPostData(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBlogSubmit = async (formData) => {
    setLoading(true);
    try {
      await updatePost(id, formData);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="loading">Loading post data...</div>
      </Layout>
    );
  }

  return (
    <BlogForm
      categories={categories}
      onSubmit={handleBlogSubmit}
      initialData={postData}
      isSubmitting={loading}
    />
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Home page WITHOUT Layout */}
          <Route path="/" element={<Home />} />

          {/* ✅ Auth pages */}
          <Route
            path="/login"
            element={
              <Layout showFooter={false}>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout showFooter={false}>
                <Register />
              </Layout>
            }
          />

          {/* ✅ Blog pages */}
          <Route
            path="/blog"
            element={
              <Layout>
                <PrivateRoute>
                  <BlogDashboard />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/create"
            element={
              <Layout>
                <PrivateRoute>
                  <CreatePostWrapper />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/all"
            element={
              <Layout>
                <PrivateRoute>
                  <AllPosts />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/:id/edit"
            element={
              <Layout>
                <PrivateRoute>
                  <EditPostWrapper />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Layout>
                <PrivateRoute>
                  <SinglePost />
                </PrivateRoute>
              </Layout>
            }
          />
          {/* <Route
            path="/blog/:id/manage"
            element={
              <Layout>
                <PrivateRoute>
                  <ManagePost />
                </PrivateRoute>
              </Layout>
            }
          /> */}
          <Route
            path="/categories/:id"
            element={
              <Layout>
                <PrivateRoute>
                  <CategoryDetail />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* ✅ Admin */}
          <Route
            path="/admin"
            element={
              <Layout>
                <PrivateRoute admin>
                  <AdminDashboard />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* ✅ 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
