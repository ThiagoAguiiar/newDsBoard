/*  




import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/Firebase";
import React from "react";

interface IProvider {
  children: JSX.Element;
}

interface ITask {
  uid: string | null;
  task: string;
}

interface IGetTask {
  uid: string | null;
}

interface IStatus {
  description: string | null;
  code: string | null;
}

interface IContext {
  createTask: (task: ITask) => void;
  encodeDoc: (doc: File) => void;
  decodeDoc: (doc: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  getTasks: (uid: IGetTask) => void;
  status: IStatus | null;
  setStatus: (state: IStatus) => void;
}

const initialValue = {
  createTask: () => undefined,
  encodeDoc: () => undefined,
  decodeDoc: () => undefined,
  loading: false,
  setLoading: () => undefined,
  getTasks: () => undefined,
  status: null,
  setStatus: () => undefined,
};

export const TaskContext = React.createContext<IContext>(initialValue);

export const TaskProvider = ({ children }: IProvider) => {
  const [loading, setLoading] = React.useState<boolean>(initialValue.loading);
  const [status, setStatus] = React.useState<IStatus | null>(
    initialValue.status
  );

  // Envia tarefa para o Firebase
  async function createTask(taskData: ITask) {
    try {
      setLoading(true);
      setStatus({ description: "Salvo com sucesso", code: "Ok" });

      await addDoc(collection(db, "Tarefas"), {
        tarefa: taskData.task,
        user: taskData.uid,
      });
    } catch (e) {
      console.log(e);
      setStatus({ description: "Erro inesperado", code: "Error" });
    } finally {
      setLoading(false);
    }
  }

  // Busca todas as tarefas do usuário logado
  async function getTasks(uid: IGetTask) {
    try {
      setLoading(true);
      const q = query(collection(db, "Tarefas"), where("user", "==", uid.uid));
      const result = await getDocs(q);
      const response = result.docs.map((doc) => doc.data());
      return response;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // Enconding and Decoding de Arquivos
  function encodeDoc() {
    return;
  }

  function decodeDoc() {
    return;
  }

  return (
    <TaskContext.Provider
      value={{
        createTask,
        encodeDoc,
        decodeDoc,
        loading,
        setLoading,
        getTasks,
        status,
        setStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};



*/

import { addDoc, collection } from "firebase/firestore";
import React, { createContext, ReactNode, useState, useContext } from "react";
import { db } from "../api/Firebase";

type TaskContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null | unknown;
  setError: (error: string) => void;
  status: StatusType | null;
  setStatus: (status: StatusType) => void;
  getDate: () => string;
  createTask: (mewTask: NewTaskType) => Promise<void>;
};

type TaskProviderType = {
  children: ReactNode | ReactNode[];
};

type NewTaskType = {
  uid: string;
  title: string;
  description: string;
  date: string;
  document?: File;
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

  const setInternalLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const setInternalError = (error: string) => {
    setError(error);
  };

  const setInternalStatus = (status: StatusType) => {
    setStatus({ msg: status.msg, response: status.response });
  };

  // Pegando a data que o usuário criou a tarefa
  const getDate = (): string => {
    const date = new Date();
    return date.toLocaleString();
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

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        status,
        setLoading: setInternalLoading,
        setError: setInternalError,
        setStatus: setInternalStatus,
        getDate,
        createTask,
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
