import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login, register } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [token]);

  const loginUser = async (email, password) => {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    return response;
  };

  const registerUser = async (name, email, password) => {
    const response = await register(name, email, password);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login: loginUser,
        register: registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;