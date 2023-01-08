import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../database/Firebase";

const defaultValue = {
  login: false,
  errorUser: null,
  loading: false,
  setLogin: () => undefined,
  setErrorUser: () => undefined,
  setLoading: () => undefined,
  cadastrarUser: () => undefined,
  loginUser: () => undefined,
};

interface UserContextProps {
  login: boolean;
  loading: boolean;
  errorUser: string | null;
  setLogin: (state: boolean) => void;
  setErrorUser: (state: string | null) => void;
  setLoading: (state: boolean) => void;
  cadastrarUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
}

interface UserProviderProps {
  children: JSX.Element;
}

export const UserContext = React.createContext<UserContextProps>(defaultValue);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [login, setLogin] = React.useState(defaultValue.login);
  const [errorUser, setErrorUser] = React.useState<string | null>(
    defaultValue.errorUser
  );
  const [loading, setLoading] = React.useState(defaultValue.loading);

  const auth = getAuth(app);

  // Fazendo login do usuário
  async function loginUser(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        setErrorUser(null);
        console.log(userCredential.user);
      })
      .catch((e) => {
        setErrorUser(e.code);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Cadastrando um usuário no Banco de dados
  function cadastrarUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log(userCredential.user))
      .catch((error) => {
        setErrorUser(error.errorMessage);
      });
  }

  return (
    <UserContext.Provider
      value={{
        login,
        loading,
        errorUser,
        setLogin,
        setErrorUser,
        setLoading,
        cadastrarUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
