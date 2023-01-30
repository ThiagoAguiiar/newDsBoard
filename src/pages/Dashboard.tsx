import React from "react";
import styles from "./Dashboard.module.scss";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import { ModalContext } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Other/Loading";
import { useTask } from "../context/TaskContext";

export default function Dashboard() {
  const task = useTask();
  const { setIsOpenModal } = React.useContext(ModalContext);
  const [token, setToken] = React.useState<string | null>(null);

  const title = useForm();
  const description = useForm();

  React.useEffect(() => {
    setIsOpenModal(false);
    const local = localStorage.getItem("token");

    if (local) {
      setToken(JSON.parse(local));
    }
  }, []);

  // OnChange event para o input File
  function getFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { files } = target;
    if (files) task.encodeFile(files);
  }

  // Enviando tarefa para o Banco de Dados
  function submitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tasks}>
          <div>
            <h1>Tarefas de </h1>
            <form onSubmit={submitTask}>
              <Input
                id="title-task"
                placeholder="Título da Tarefa"
                type="text"
                {...title}
              />
              <div className={styles.actions}>
                <label htmlFor="archive">
                  <FiPaperclip />
                  <p>arquivo</p>
                </label>
                <Input id="archive" type="file" onChange={getFile} />
              </div>
              <div className={styles.button}>
                <Button
                  value={
                    task.loading ? (
                      <Loading
                        width="25px"
                        height="25px"
                        border="3px solid #ffffff"
                        borderTop="3px solid #0E38CC"
                      />
                    ) : (
                      "Adicionar tarefa"
                    )
                  }
                  borderRadius="3px"
                  fontSize="1rem"
                />
              </div>
            </form>
          </div>
        </div>

        <div className={styles.listTask}>
          <p>Suas tarefas</p>
        </div>
      </div>
    </>
  );
}
