import React, { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import { useModal } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Other/Loading";
import { useTask } from "../context/TaskContext";
import { useData } from "../hooks/useData";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default function Dashboard() {
  // Hooks
  const task = useTask();
  const data = useData();
  const modal = useModal();

  const [description, setDescription] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<boolean>(false);

  const title = useForm();

  useEffect(() => {
    modal.setIsOpenModal(false);
    task.getAllTasks(data?.localToken);
  }, []);

  // OnChange event para o input File
  function getFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { files } = target;

    if (files) {
      task.saveFiles(files, data?.localToken);
      setFile(true);
    }
  }

  // Onchange event para o TextArea
  const getDescription = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  function submitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Enviando dados para o Firebase
    if (title.validate()) {
      task.createTask({
        title: title.value,
        date: task.getDate(),
        description: description,
        uid: data?.localToken,
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
          <div
            style={{ padding: ".5rem 0rem", borderBottom: "1px solid #eeeeee" }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: 500 }}>
              Suas Atividades
            </p>
          </div>
          {task.allTask ? (
            task.allTask.map((task, index) => (
              <div
                key={index}
                className={`${styles.taskContainer} animate__animated  animate__fadeIn`}
              >
                <div className={styles.text}>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                </div>

                <div className={styles.actions}>
                  {task.document ? (
                    <a href="" className={styles.document} download>
                      <AiOutlineCloudDownload size={20} />
                      Baixar
                    </a>
                  ) : (
                    <span
                      className={styles.document}
                      style={{ cursor: "default" }}
                    >
                      Doc Vazio
                    </span>
                  )}
                  <button className={styles.edit}>
                    <MdOutlineEdit size={20} />
                  </button>
                  <button className={styles.delete}>
                    <BsTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.loading}>
              <Loading
                width="50px"
                height="50px"
                border="5px solid #ffffff"
                borderTop="5px solid #0E38CC"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
