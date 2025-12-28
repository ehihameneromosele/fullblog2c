import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  FileText, 
  FileEdit, 
  LogIn, 
  UserPlus,
  LogOut 
} from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, logout, theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CHBlog
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/blog" className="nav-link">
              <FileText size={18} className="nav-icon" />
              <span>Blog</span>
            </Link>
          </li>
          
          {/* Theme Toggle Button */}
          <li className="nav-item">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={18} className="theme-icon" />
              ) : (
                <Sun size={18} className="theme-icon" />
              )}
            </button>
          </li>
          
          {user ? (
            <>
              {/* Only show Create Post if user is admin */}
              {(user?.is_blog_admin || user?.role === "admin") && (
                <li className="nav-item">
                  <button
                    className="nav-create-btn"
                    onClick={() => navigate("/blog/create")}
                  >
                    <FileEdit size={18} className="nav-icon" />
                    <span>Create Post</span>
                  </button>
                </li>
              )}

              <li className="nav-item">
                <span className="nav-user">
                  <span className="user-greeting">Hello,</span>
                  <span className="username">{user.username}</span>
                </span>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-logout">
                  <LogOut size={18} className="nav-icon" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <LogIn size={18} className="nav-icon" />
                  <span>Login</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-register">
                  <UserPlus size={18} className="nav-icon" />
                  <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;