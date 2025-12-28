import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children, showFooter = true }) => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="layout">
      <Navbar user={user} logout={logout} theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;