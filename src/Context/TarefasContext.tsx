import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  getAllTasks: () => void;
  createTasks: () => void;
};

type ProviderType = {
  children: ReactNode | ReactNode[];
};

const TarefasContext = createContext<ContextType | null>(null);

export const TarefasProvider = ({ children }: ProviderType) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const local = localStorage.getItem("token");
    setToken(local);
  }, []);

  const getAllTasks = async () => {
    try {
      if (token) return;
    } catch (e) {
      console.log(e);
    }
  };

  const createTasks = () => {
    return;
  };

  return (
    <TarefasContext.Provider value={{ getAllTasks, createTasks }}>
      {children}
    </TarefasContext.Provider>
  );
};

export const useTarefas = () => {
  const context = useContext(TarefasContext);
  if (!context) throw new Error("Contexto Tarefas retornou nulo");
  return context;
};
