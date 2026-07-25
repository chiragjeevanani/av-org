import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('av_admin_access_token') || localStorage.getItem('av_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const currentToken = localStorage.getItem('av_admin_access_token') || localStorage.getItem('av_admin_token');
      if (currentToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setAdmin(res.data.admin);
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const accessToken = res.data.accessToken || res.data.token;
      const refreshToken = res.data.refreshToken;

      localStorage.setItem('av_admin_access_token', accessToken);
      localStorage.setItem('av_admin_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('av_admin_refresh_token', refreshToken);
      }
      localStorage.setItem('av_admin_user', JSON.stringify(res.data.admin));

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setToken(accessToken);
      setAdmin(res.data.admin);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('av_admin_access_token');
    localStorage.removeItem('av_admin_token');
    localStorage.removeItem('av_admin_refresh_token');
    localStorage.removeItem('av_admin_user');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
