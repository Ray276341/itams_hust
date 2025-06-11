import { useState } from 'react';
import { auth } from '../api/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authContext, setAuthContext] = useState(null);

  const getAuth = async () => {
    setIsLoading(true);
    try {
      const data = await auth();
      setAuthContext(data);
      setIsAuthenticated(true);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateAuth = async () => {
    try {
      const data = await auth();
      setAuthContext(data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isLoading,
    authContext,
    isAuthenticated,
    getAuth,
    updateAuth,
  };
};
