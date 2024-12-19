// frontend/src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  return { isAuthenticated: !!token, user };
};
