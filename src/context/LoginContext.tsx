import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../api/Firebase";
import { useNavigate } from "react-router-dom";

// Tipagem dos parâmetros do Contexto
interface IContext {
  error: string | null;
  loading: boolean;
  setError: (state: string) => void;
  setLoading: (state: boolean) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  loginWithGoogleAccount: () => void;
  logoutUser: () => void;
}

interface IProvider {
  children: JSX.Element;
}

// Valores iniciais dos estados do componente
const initialValue = {
  error: null,
  loading: false,
  setError: () => undefined,
  setLoading: () => undefined,
  loginWithEmailPassword: () => undefined,
  loginWithGoogleAccount: () => undefined,
  logoutUser: () => undefined,
};

export const LoginContext = React.createContext<IContext>(initialValue);

export const LoginProvider = ({ children }: IProvider) => {
  const [loading, setLoading] = React.useState(initialValue.loading);
  const [error, setError] = React.useState<string | null>(initialValue.error);

  const navigate = useNavigate();

  // Login no Firebase
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  async function loginWithEmailPassword(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithEmailAndPassword(auth, email, password);
      const response = result.user;

      localStorage.setItem("token", JSON.stringify(response.uid));
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // Login com conta do Google
  async function loginWithGoogleAccount() {
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithPopup(auth, provider);
      const response = result.user;

      localStorage.setItem("token", JSON.stringify(response.uid));
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // Login automático
  React.useEffect(() => {
    function autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        setError(null);
        setLoading(true);
        navigate("/dashboard");
      }
    }

    autoLogin();
  }, []);

  // Deslogar Usuário da conta
  const logoutUser = React.useCallback(async () => {
    setLoading(false);
    setError(null);
    navigate("/");

    localStorage.removeItem("token");
  }, [navigate]);

  return (
    <LoginContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        loginWithEmailPassword,
        loginWithGoogleAccount,
        logoutUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
