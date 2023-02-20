import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../Api/Firebase";
import { useNavigate } from "react-router-dom";

type UserType = {
  children: ReactNode | ReactNode[];
};

type UserContextType = {
  loading: LoadingType;
  setLoading: (state: LoadingType) => void;
  error: string | null;
  setError: (state: string) => void;
  login: boolean;
  setLogin: (state: boolean) => void;
  data: DataType | null;
  setData: (state: DataType) => void;
  credentialsLogin: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  autoLogin: () => void;
  logoutUser: () => void;
  createAccount: (email: string, password: string) => Promise<void>;
  getUserData: () => void;
  forgotPassword: (email: string) => Promise<void>;
  token: string | null;
};

type LoadingType = {
  credentialLoginLoading: boolean;
  googleLoginLoading: boolean;
  createAccountLoading: boolean;
  getUserDataLoading: boolean;
  forgotPasswordLoading: boolean;
};

type DataType = {
  name: string;
  photo: string;
  email: string;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserType) => {
  const [loading, setLoading] = useState<LoadingType>({
    credentialLoginLoading: false,
    googleLoginLoading: false,
    createAccountLoading: false,
    getUserDataLoading: false,
    forgotPasswordLoading: false,
  });

  const [login, setLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const local = localStorage.getItem("token");
    if (local) setToken(local);
  });

  const navigate = useNavigate();

  const setInternalError = (error: string) => {
    setError(error);
  };

  const setInternalLogin = (login: boolean) => {
    setLogin(login);
  };

  const setInternalData = (data: DataType) => {
    setData(data);
  };

  // Login com Email e Senha
  const credentialsLogin = async (email: string, password: string) => {
    try {
      setLoading({ ...loading, credentialLoginLoading: true });
      setError(null);

      const response = await signInWithEmailAndPassword(auth, email, password);
      const result = response.user.uid.toString();

      if (result) {
        setLogin(true);
        localStorage.setItem("token", result);
        navigate("/dashboard");
      }
    } catch (e: any) {
      setError(e.code.toString());
    } finally {
      setLoading({ ...loading, credentialLoginLoading: false });
    }
  };

  // Login com Google
  const googleLogin = async () => {
    try {
      setLoading({ ...loading, googleLoginLoading: true });
      setError(null);

      const response = await signInWithPopup(auth, provider);
      const result = response.user.uid.toString();

      if (result) {
        setLogin(true);
        localStorage.setItem("token", result);
        navigate("/dashboard");
      }
    } catch (e: any) {
      setError(e.code.toString());
    } finally {
      setLoading({ ...loading, googleLoginLoading: false });
    }
  };

  // Cadastrar usuário
  const createAccount = async (email: string, password: string) => {
    try {
      setLoading({ ...loading, createAccountLoading: false });
      setError(null);

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = response.user.uid.toString();

      if (result) {
        setLogin(true);
        localStorage.setItem("token", result);
        navigate("/dashboard");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.code.toString());
    } finally {
      setLoading({ ...loading, createAccountLoading: false });
    }
  };

  // Auto Login
  const autoLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
      setLogin(true);
    }
  };

  // Buscar dados do usuário
  const getUserData = () => {
    try {
      setLoading({ ...loading, getUserDataLoading: true });
      setError(null);

      onAuthStateChanged(auth, (user) => {
        if (user)
          setData({
            name: user.displayName ? user.displayName : "Usuário",
            email: user.email!,
            photo: user.photoURL!,
          });
      });
    } catch (e: any) {
      setError(e.code.toString());
    } finally {
      setLoading({ ...loading, getUserDataLoading: false });
    }
  };

  // Esqueceu sua senha?
  const forgotPassword = async (email: string) => {
    try {
      setLoading({ ...loading, forgotPasswordLoading: true });
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setError("Email enviado! Verifique sua caixa de spam");
    } catch (e: any) {
      console.log(e);
      setError(e.code.toString());
    } finally {
      setLoading({ ...loading, forgotPasswordLoading: false });
    }
  };

  // Deslogar usuário
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setError(null);
    setLogin(false);
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError: setInternalError,
        login,
        setLogin: setInternalLogin,
        data,
        setData: setInternalData,
        credentialsLogin,
        googleLogin,
        autoLogin,
        logoutUser,
        createAccount,
        getUserData,
        forgotPassword,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Erro ao usar contexto");
  return context;
};
