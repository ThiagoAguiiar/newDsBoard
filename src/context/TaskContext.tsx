import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../api/Firebase";
import { useData } from "../hooks/useData";
import { randomCode } from "../function/RandomCode";

type TaskContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string) => void;
  toBase64: string | undefined | null;
  setToBase64: (data: string) => void;
  allTask: null | DocumentData[];
  getDate: () => string;
  createTask: (mewTask: NewTaskType) => Promise<void>;
  getAllTasks: () => Promise<void>;
  saveFiles: (file: FileList | null) => Promise<void>;
  deleteTask: (idTarefa: string) => Promise<void>;
};

type TaskProviderType = {
  children: ReactNode | ReactNode[];
};

type NewTaskType = {
  title: string;
  description?: string | null;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: TaskProviderType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toBase64, setToBase64] = useState<string | null | undefined>(null);
  const [allTask, setAllTask] = useState<null | DocumentData[]>(null);

  const data = useData();
  const id = randomCode(16);

  // Proteção dos estados
  const setInternalLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const setInternalError = (error: string) => {
    setError(error);
  };

  const setInternalToBase64 = (data: string) => {
    setToBase64(data);
  };

  // Pegando a data que o usuário criou a tarefa
  const getDate = (): string => {
    const date = new Date();
    return date.toLocaleString();
  };

  // Salvando documentos no Firebase Storage
  const saveFiles = async (file: FileList | null) => {
    try {
      setError(null);

      if (file) {
        const filePath = ref(storage, `${data?.localToken}/${file[0].name}`);
        await uploadBytes(filePath, file[0]);
      }
    } catch (e: any) {
      console.log(e);
      setError(e);
    }
  };

  // Salvando Tarefa no Firebase Firestore
  const createTask = async (newTask: NewTaskType) => {
    try {
      const { title, description } = newTask;

      setLoading(true);
      setError(null);

      await setDoc(doc(db, "Tarefas", id), {
        title: title,
        description: description,
        date: getDate(),
        user: data?.localToken,
        idTarefa: id,
      });
    } catch (e: any) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // Buscando as Tarefas do usuário
  async function getAllTasks() {
    try {
      const collectionTask = query(
        collection(db, "Tarefas"),
        where("user", "==", data?.localToken)
      );

      const response = await getDocs(collectionTask);
      const result = response.docs.map((doc) => doc.data());
      setAllTask(result);

      setLoading(true);
      setError(null);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  // Deletando tarefa do Firebase
  const deleteTask = async (idTarefa: string) => {
    try {
      await deleteDoc(doc(db, "Tarefas", idTarefa));
      setLoading(true);
      setError(null);
    } catch (e: any) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [allTask]);

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        toBase64,
        allTask,
        setLoading: setInternalLoading,
        setError: setInternalError,
        setToBase64: setInternalToBase64,
        getAllTasks,
        getDate,
        createTask,
        saveFiles,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('Erro ao utilizar o contexto "useTask"');
  return context;
};
