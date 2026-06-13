import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
} from "../services/authService";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const res =
            await getCurrentUser();

          setUser(res.data);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  () =>
    useContext(
      AuthContext
    );