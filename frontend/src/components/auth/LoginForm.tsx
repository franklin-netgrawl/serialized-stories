'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/features/auth/authSlice';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials)).unwrap();
      // Handle successful login
    } catch (err) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          email: e.target.value
        }))}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          password: e.target.value
        }))}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
