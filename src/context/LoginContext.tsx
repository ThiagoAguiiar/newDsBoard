import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../api/Firebase";
import { useNavigate } from "react-router-dom";

type LoginContextType = {
  error: string | null | unknown;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  loginWithGoogleAccount: () => void;
  logout: () => void;
};

type LoginProviderProps = {
  children: ReactNode | ReactNode[];
};

// Context
export const LoginContext = createContext<LoginContextType | null>(null);

// Provider
export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [error, setError] = useState<string | unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Firebase config
  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const setInternalError = (error: string) => {
    setError(error);
  };

  const setInternalLoading = (loading: boolean) => {
    setLoading(loading);
  };

  // Login com Email e Senha
  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const response = result.user;

      const userData = {
        name: response.displayName,
        email: response.email,
        photo: response.photoURL,
      };

      localStorage.setItem("token", JSON.stringify(response.uid));
      localStorage.setItem("user-data", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (e: any) {
      console.log(e);
      setError(e.code);
    } finally {
      setLoading(false);
    }
  };

  // Login com Google
  const loginWithGoogleAccount = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const response = result.user;

      const userData = {
        name: response.displayName,
        email: response.email,
        photo: response.photoURL,
      };

      localStorage.setItem("token", JSON.stringify(response.uid));
      localStorage.setItem("user-data", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (e: any) {
      console.log(e);
      setError(e.code);
    } finally {
      setLoading(false);
    }
  };

  // Encerrar Sessão
  const logout = useCallback(async () => {
    setError(null);
    setLoading(true);
    navigate("/");
    localStorage.removeItem("token");
    window.location.reload();
  }, [navigate]);

  return (
    <LoginContext.Provider
      value={{
        error,
        loading,
        setError: setInternalError,
        loginWithEmailPassword,
        loginWithGoogleAccount,
        setLoading: setInternalLoading,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Hook para usar o contexto
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error("Você precisa usar o LoginProvider");
  return context;
};
