import React from "react";
import styles from "./Dashboard.module.scss";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import { ModalContext } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Other/Loading";
import { useTask } from "../context/TaskContext";
import { useData } from "../hooks/useData";

export default function Dashboard() {
  // Hooks
  const task = useTask();
  const data = useData();

  const { setIsOpenModal } = React.useContext(ModalContext);
  const [token, setToken] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<boolean>(false);

  const title = useForm();

  React.useEffect(() => {
    setIsOpenModal(false);
    setToken(data?.localToken);
  }, []);

  // OnChange event para o input File
  function getFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { files } = target;
    if (files) {
      task.encodeFile(files);
      setFile(true);
    }
  }

  // Onchange event para o TextArea
  const getDescription = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  // Enviando tarefa para o Banco de Dados
  function submitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.validate()) {
      task.createTask({
        title: title.value,
        date: task.getDate(),
        description: description,
        uid: token,
        document: task.toBase64,
      });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tasks}>
          <div>
            <h1>Criar uma nova tarefa</h1>
            <form onSubmit={submitTask}>
              <Input
                id="title-task"
                placeholder="Título"
                type="text"
                {...title}
              />
              <textarea
                id="desc-task"
                className={styles.textArea}
                placeholder="Descrição"
                onChange={getDescription}
              />
              <div className={styles.actions}>
                <label htmlFor="archive">
                  <FiPaperclip />
                  <p>{file ? "arquivo adicionado" : "arquivo"} </p>
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
          <p>Seus compromissos</p>
        </div>
      </div>
    </>
  );
}
