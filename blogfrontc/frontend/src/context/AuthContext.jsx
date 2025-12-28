import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const finalUser = userData.user || userData;
    
    if (userData.access) {
      localStorage.setItem('access_token', userData.access);
    }
    if (userData.refresh) {
      localStorage.setItem('refresh_token', userData.refresh);
    }

    localStorage.setItem('user', JSON.stringify(finalUser));
    setUser(finalUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create and export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};