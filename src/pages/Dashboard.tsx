import React from "react";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import { ModalContext } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { TaskContext } from "../context/TaskContext";

import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const [token, setToken] = React.useState<null | string>(null);
  const { setIsOpenModal } = React.useContext(ModalContext);
  const { createTask, getTasks } = React.useContext(TaskContext);

  // Controla o menu a ser fechado e busca o token
  React.useEffect(() => {
    setIsOpenModal(false);
    const local = localStorage.getItem("token");
    if (local) {
      setToken(JSON.parse(local));
      getTasks({ uid: JSON.parse(local) });
    }
  }, []);

  const task = useForm();

  // Enviando tarefa para o banco de dados
  function submitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (task.validate()) {
      createTask({
        task: task.value,
        uid: token,
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        <div>
          <h1>Tarefas de </h1>
          <form onSubmit={submitTask}>
            <Input
              id="tarefa"
              placeholder="Adicionar uma Tarefa"
              type="text"
              {...task}
            />
            <div className={styles.actions}>
              <label htmlFor="archive">
                <FiPaperclip />
                <p>arquivo</p>
              </label>
              <Input id="archive" placeholder="" type="file" />
            </div>
            <div className={styles.button}>
              <Button
                value="Adicionar Tarefa"
                borderRadius="3px"
                fontSize="1rem"
              />
            </div>
          </form>
        </div>
      </div>

      <div className={styles.listTask}>
        <p>Suas tarefas</p>
        <div className={styles.taskContainer}></div>
      </div>
    </div>
  );
}
