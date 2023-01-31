import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { db } from "../api/Firebase";

type TaskContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null | unknown;
  setError: (error: string) => void;
  status: StatusType | null;
  setStatus: (status: StatusType) => void;
  toBase64: string | undefined | null;
  setToBase64: (data: string) => void;
  getDate: () => string;
  createTask: (mewTask: NewTaskType) => Promise<void>;
  encodeFile: (file: FileList) => void;
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
  const [allTask, setAllTesk] = useState<null | DocumentData>(null);

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

  // Pegando a data que o usuário criou a tarefa
  const getDate = (): string => {
    const date = new Date();
    return date.toLocaleString();
  };

  // Encode File to base64
  const encodeFile = (file: FileList) => {
    const reader = new FileReader();

    reader.readAsDataURL(file[0]);
    reader.onload = function (event) {
      const base64 = event.target?.result?.toString();
      setToBase64(base64);
    };
  };

  // Decode File to base64
  const decodeFile = (file: string) => {
    return;
  };

  // Salvando tarefa no Firebase
  const createTask = async (newTask: NewTaskType) => {
    try {
      setLoading(true);
      setError(null);

      const result = await addDoc(collection(db, "Tarefas"), {
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
        user: newTask.uid,
        document: newTask.document,
      });
      const response = result.id;
      if (response)
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
      console.log(result.docs.map((doc) => doc.data()));

      setLoading(true);
      setError(null);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  // Buscando todas as tarefas do usuário
  // Preciso passar uma dependência
  useEffect(() => {
    const local = localStorage.getItem("token");
    if (local) getAllTasks(JSON.parse(local));
  }, []);

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        status,
        toBase64,
        setLoading: setInternalLoading,
        setError: setInternalError,
        setStatus: setInternalStatus,
        setToBase64: setInternalToBase64,
        getDate,
        createTask,
        encodeFile,
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
