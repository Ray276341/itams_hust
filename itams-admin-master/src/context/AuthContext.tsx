import { createContext, useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

const AuthContext = createContext<any>(null);

function AuthProvider({ children }: any) {
  const { isLoading, authContext, isAuthenticated, getAuth, updateAuth } =
    useAuth();
  const { notifications, getNotifications } = useNotification();

  useEffect(() => {
    getAuth();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <AuthContext.Provider
      value={{
        authContext,
        isAuthenticated,
        getAuth,
        updateAuth,
        notifications,
        getNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
