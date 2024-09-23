import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated (i.e., if userDetails exist in localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  // Function to log the user in
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuth(true);
      localStorage.setItem('currentuser', JSON.stringify({ email, password }));
      return true;
    }
    return false;
  };

  // Function to log the user out
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('userDetails');
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
