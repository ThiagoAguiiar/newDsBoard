import React from "react";
import { app } from "../api/Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Tipagem dos parâmetros
interface UserProviderProps {
  children: JSX.Element;
}

interface UserContextProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
  errorAuth: string | null;
  setErrorAuth: (state: string | null) => void;
  cadastrarUsuario: (email: string, password: string) => void;
  loginUsuario: (email: string, password: string) => void;
  loginGoogle: () => void;
  logoutUsuario: () => void;
}

// Valores iniciais
const initialValue = {
  loading: false,
  data: null,
  errorAuth: null,
  setLoading: () => undefined,
  setErrorAuth: () => undefined,
  cadastrarUsuario: () => undefined,
  loginUsuario: () => undefined,
  loginGoogle: () => undefined,
  logoutUsuario: () => undefined,
};

export const UserContext = React.createContext<UserContextProps>(initialValue);

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [loading, setLoading] = React.useState(initialValue.loading);
  const [errorAuth, setErrorAuth] = React.useState<string | null>(
    initialValue.errorAuth
  );

  // Cadastrar Funcionário no Firebase
  async function cadastrarUsuario(email: string, password: string) {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const response = result.user;
      localStorage.setItem("token", response.uid);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.displayName,
          email: response.email,
          photo: response.photoURL,
        })
      );
    } catch (error: any) {
      setErrorAuth(error.code);
    } finally {
      setLoading(false);
    }
  }

  // Login Funcionário Firebase
  async function loginUsuario(email: string, password: string) {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const response = result.user;
      localStorage.setItem("token", response.uid);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.displayName,
          email: response.email,
          photo: response.photoURL,
        })
      );
    } catch (error: any) {
      setErrorAuth(error.code);
    } finally {
      setLoading(false);
    }
  }

  // Login com conta do Google
  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const response = result.user;
      localStorage.setItem("token", response.uid);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.displayName,
          email: response.email,
          photo: response.photoURL,
        })
      );
    } catch (error: any) {
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  }

  // Deslogar Funcionário
  function logoutUsuario() {
    localStorage.removeItem("token");
    setLoading(false);
    setErrorAuth(null);
    navigate("/");
    location.reload();
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        errorAuth,
        setLoading,
        cadastrarUsuario,
        loginUsuario,
        setErrorAuth,
        logoutUsuario,
        loginGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
