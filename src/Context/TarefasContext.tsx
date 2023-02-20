import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";
import { db } from "../Api/Firebase";
import { useUserContext } from "./UserContext";

type ContextType = {
  getAllTasks: () => Promise<void>;
  createTasks: (title: string, description: string) => void;
  loading: boolean;
  status: StatusType | null;
  setStatus: (state: StatusType | null) => void;
  tasks: DocumentData | DocumentData[] | null;
  deleteTasks: (id: string) => Promise<void>;
  editTask: DocumentData | null;
  getEditTask: (id: string) => Promise<void>;
};

type ProviderType = {
  children: ReactNode | ReactNode[];
};

type StatusType = {
  msg: string | null;
  error: number;
};

const TarefasContext = createContext<ContextType | null>(null);

export const TarefasProvider = ({ children }: ProviderType) => {
  const { token } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [tasks, setTasks] = useState<DocumentData | DocumentData[] | null>(
    null
  );
  const [editTask, setEditTask] = useState<DocumentData | null>(null);

  const setInternalStatus = (status: StatusType | null) => {
    setStatus(status);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
  };

  const createTasks = async (title: string, description?: string) => {
    try {
      setLoading(true);

      if (token) {
        const response = await addDoc(collection(db, token), {
          titulo: title,
          descricao: description,
          date: getCurrentDate(),
        });

        if (response)
          setStatus({
            msg: "Tarefa adicionada com sucesso",
            error: 200,
          });
      }
    } catch (e) {
      setStatus({
        msg: "Ocorreu um erro Inesperado",
        error: 404,
      });
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await getDocs(query(collection(db, token)));
        console.log(response);
        console.log(token);
        setTasks(response.docs);
      }
    } catch (e) {
      setStatus({
        msg: "Não foi possível concluir a operação",
        error: 404,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTasks = async (id: string) => {
    try {
      setStatus({
        msg: "Tarefa excluída com sucesso!",
        error: 200,
      });

      if (token) await deleteDoc(doc(db, token, id));
    } catch (e) {
      setStatus({
        msg: "Não foi possível concluir a operação",
        error: 404,
      });
    }
  };

  const getEditTask = async (id: string) => {
    if (token) {
      const response = await getDoc(doc(db, token, id));
      const result = response;
      setEditTask(result);
    }

    try {
      setLoading(true);
    } catch (e) {
      setStatus({
        msg: "Não foi possível concluir a operação",
        error: 404,
      });
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
        deleteTasks,
        getEditTask,
        editTask,
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
