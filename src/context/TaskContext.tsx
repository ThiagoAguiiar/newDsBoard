import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/Firebase";
import React from "react";

interface ITask {
  uid: string | null;
  task: string;
}

interface IGetTask {
  uid: string | null;
}

interface IContext {
  createTask: (task: ITask) => void;
  encodeDoc: (doc: File) => void;
  decodeDoc: (doc: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  getTasks: (uid: IGetTask) => void;
}

interface IProvider {
  children: JSX.Element;
}

const initialValue = {
  createTask: () => undefined,
  encodeDoc: () => undefined,
  decodeDoc: () => undefined,
  loading: false,
  setLoading: () => undefined,
  getTasks: () => undefined,
};

export const TaskContext = React.createContext<IContext>(initialValue);

export const TaskProvider = ({ children }: IProvider) => {
  const [loading, setLoading] = React.useState(initialValue.loading);

  // Envia tarefa para o firebase
  async function createTask(task: ITask) {
    try {
      setLoading(true);

      await addDoc(collection(db, "Tarefas"), {
        tarefa: task.task,
        user: task.uid,
      });
    } catch (e) {
      console.log(e);
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
      const response = result;
      console.log(response.docs.map((doc) => doc.data()));
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
