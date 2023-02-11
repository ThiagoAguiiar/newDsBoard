import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import { useModal } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Other/Loading";
import { useTask } from "../context/TaskContext";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { Delete } from "../components/Modal/Delete";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { createTask, getAllTasks, saveFiles, loading, allTask, deleteTask } =
    useTask();

  const modal = useModal();
  const title = useForm();

  const [description, setDescription] = useState<string | null>(null);
  const [file, setFile] = useState<FileList | null>(null);

  useEffect(() => {
    modal.setIsOpenModal(false);
    getAllTasks();
  }, []);

  // Input File Event
  function getFiles({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { files } = target;
    if (files) setFile(files);
  }

  // Text Area Event
  const getDescriptionValue = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviando dados para o Firebase
    if (title.validate()) {
      createTask({
        title: title.value,
        description: description,
      });
    }

    getAllTasks();
    saveFiles(file);
  };

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
                onChange={getDescriptionValue}
              />
              <div className={styles.actions}>
                <label htmlFor="archive">
                  <FiPaperclip />
                  <p>{file ? "arquivo adicionado" : "arquivo"} </p>
                </label>
                <Input id="archive" type="file" onChange={getFiles} />
              </div>
              <div className={styles.button}>
                <Button
                  value={
                    loading ? (
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
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              Suas Atividades
            </p>
          </div>

          {allTask ? (
            allTask.map((task, index) => (
              <div
                key={index}
                className={`${styles.taskContainer} animate__animated  animate__fadeInUp`}
              >
                <div className={styles.text}>
                  <p className={styles.title}>{task.title}</p>
                  <p className={styles.description}>{task.description}</p>
                </div>

                <div className={styles.actions}>
                  <a href="" className={styles.document} download>
                    <AiOutlineCloudDownload size={20} />
                  </a>
                  <Link to={task.idTarefa}>
                    <button className={styles.edit}>
                      <MdOutlineEdit size={20} />
                    </button>
                  </Link>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      modal.setIsDeleteModal(true);
                      deleteTask(task.idTarefa);
                    }}
                  >
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

      {modal.isDeleteModal && <Delete />}
    </>
  );
}
