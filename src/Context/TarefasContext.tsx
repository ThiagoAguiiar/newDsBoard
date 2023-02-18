import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../Api/Firebase";

type ContextType = {
  getAllTasks: () => Promise<void>;
  createTasks: (title: string, description: string) => void;
  loading: boolean;
  status: StatusType | null;
  setStatus: (state: StatusType | null) => void;
  tasks: DocumentData | DocumentData[] | null;
};

type ProviderType = {
  children: ReactNode | ReactNode[];
};

type StatusType = {
  msg: string;
  color: string;
};

const TarefasContext = createContext<ContextType | null>(null);

export const TarefasProvider = ({ children }: ProviderType) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [tasks, setTasks] = useState<DocumentData[] | DocumentData | null>(
    null
  );

  useEffect(() => {
    const local = localStorage.getItem("token");
    setToken(local);
  }, [token]);

  const setInternalStatus = (status: StatusType | null) => {
    setStatus(status);
  };

  const createTasks = async (title: string, description?: string) => {
    try {
      setLoading(true);
      setStatus({
        msg: "Tarefa adicionada com sucesso",
        color: "green",
      });

      await addDoc(collection(db, token!), {
        titulo: title,
        descricao: description,
      });
    } catch (e) {
      setStatus({
        msg: "Erro Inesperado",
        color: "red",
      });
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await getDocs(query(collection(db, token!)));
      const result = response.docs.map((doc) => doc.data());
      setTasks(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TarefasContext.Provider
      value={{
        getAllTasks,
        createTasks,
        loading,
        status,
        setStatus: setInternalStatus,
        tasks,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
};

export const useTarefasContext = () => {
  const context = useContext(TarefasContext);
  if (!context) throw new Error("Contexto Tarefas retornou nulo");
  return context;
};
