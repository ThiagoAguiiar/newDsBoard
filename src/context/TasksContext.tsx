import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../api/Firebase";

interface TaskProviderProps {
  children: JSX.Element;
}

interface CreateTaskProps {
  title: string;
  description?: string;
  date: string;
  document?: string;
}

const initialValue = {};

export const TaskContext = React.createContext(initialValue);

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [token, setToken] = React.useState<string>("");

  React.useEffect(() => {
    getToken();
  }, []);

  function getToken() {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }

  async function createTask(task: CreateTaskProps) {
    try {
      const result = await setDoc(doc(db, token), task);
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <TaskContext.Provider value={{ createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
