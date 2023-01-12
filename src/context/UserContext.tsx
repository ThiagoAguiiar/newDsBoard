import React from "react";
import { app } from "../database/Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Tipagem dos parâmetros
interface UserProviderProps {
  children: JSX.Element;
}

interface UserContextProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
  data: User | null;
  setData: (value: User | null) => void;
  errorAuth: string | null;
  setErrorAuth: (state: string | null) => void;
  cadastrarUsuario: (email: string, password: string) => void;
  loginUsuario: (email: string, password: string) => void;
}

// Valores iniciais
const initialValue = {
  loading: false,
  setLoading: () => undefined,
  data: null,
  setData: () => undefined,
  errorAuth: null,
  setErrorAuth: () => undefined,
  cadastrarUsuario: () => undefined,
  loginUsuario: () => undefined,
};

export const UserContext = React.createContext<UserContextProps>(initialValue);

// Função provedora
export const UserProvider = ({ children }: UserProviderProps) => {
  const auth = getAuth(app);

  const [loading, setLoading] = React.useState(initialValue.loading);
  const [data, setData] = React.useState<User | null>(initialValue.data);
  const [errorAuth, setErrorAuth] = React.useState<string | null>(
    initialValue.errorAuth
  );

  // Cadastrar Funcionário no Firebase
  function cadastrarUsuario(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        setLoading(true);
        setData(userData.user);
      })
      .catch((error) => {
        setLoading(false);
        setErrorAuth(error.code);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  // Login Funcionário Firebase
  async function loginUsuario(email: string, password: string) {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const response = result.user;
      localStorage.setItem("token", response.uid);
    } catch (error: any) {
      setErrorAuth(error.code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        cadastrarUsuario,
        loginUsuario,
        data,
        setData,
        errorAuth,
        setErrorAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
