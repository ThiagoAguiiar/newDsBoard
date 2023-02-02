import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { createContext, ReactNode, useState, useContext } from "react";
import { db, storage } from "../api/Firebase";

type TaskContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null | unknown;
  setError: (error: string) => void;
  status: StatusType | null;
  setStatus: (status: StatusType) => void;
  toBase64: string | undefined | null;
  setToBase64: (data: string) => void;
  allTask: null | DocumentData[];
  setAllTask: (data: DocumentData[]) => void;
  getDate: () => string;
  createTask: (mewTask: NewTaskType) => Promise<void>;
  getAllTasks: (uid: string) => void;
  saveFiles: (file: FileList, uid: string) => void;
};

type TaskProviderType = {
  children: ReactNode | ReactNode[];
};

type NewTaskType = {
  uid: string | null;
  title: string;
  description?: string | null;
  date: string;
  document?: string | null;
};

type StatusType = {
  msg: string;
  response: string;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: TaskProviderType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [toBase64, setToBase64] = useState<string | null | undefined>(null);
  const [allTask, setAllTask] = useState<null | DocumentData[]>(null);

  // Proteção dos estados
  const setInternalLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const setInternalError = (error: string) => {
    setError(error);
  };

  const setInternalStatus = (status: StatusType) => {
    setStatus({ msg: status.msg, response: status.response });
  };

  const setInternalToBase64 = (data: string) => {
    setToBase64(data);
  };

  const setInternalAllTask = (data: DocumentData[]) => {
    setAllTask(data);
  };

  // Pegando a data que o usuário criou a tarefa
  const getDate = (): string => {
    const date = new Date();
    return date.toLocaleString();
  };

  // Salvando documentos no Firebase Storage
  const saveFiles = async (file: FileList, uid: string) => {
    try {
      setLoading(true);
      setError(null);

      const fileREF = ref(storage, `${uid}/${file[0].name}`);
      const response = await uploadBytes(fileREF, file[0]);
      console.log(response.ref.name);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // Salvando tarefa no Firebase Firestore
  const createTask = async (newTask: NewTaskType) => {
    try {
      const { date, title, uid, description } = newTask;

      setLoading(true);
      setError(null);

      await addDoc(collection(db, "Tarefas"), {
        title: title,
        description: description,
        date: date,
        user: uid,
      });

      setStatus({
        msg: "Salvo com sucesso",
        response: "Ok",
      });
    } catch (e: unknown) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // Buscando os dados toda vez que o usuário logar
  async function getAllTasks(uid: string) {
    try {
      const collectionTask = query(
        collection(db, "Tarefas"),
        where("user", "==", uid)
      );

      const result = await getDocs(collectionTask);
      const response = result.docs.map((doc) => doc.data());
      setAllTask(response);

      setLoading(true);
      setError(null);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  // Excluindo Tarefa
  async function deleteTask(taskID: string) {
    return;
  }

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        status,
        toBase64,
        allTask,
        setLoading: setInternalLoading,
        setError: setInternalError,
        setStatus: setInternalStatus,
        setToBase64: setInternalToBase64,
        setAllTask: setInternalAllTask,
        getAllTasks,
        getDate,
        createTask,
        saveFiles,
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
