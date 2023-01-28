import React from "react";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { FiPaperclip } from "react-icons/fi";
import styles from "./Dashboard.module.scss";
import { ModalContext } from "../context/ModalContext";

export default function Dashboard() {
  const { setIsOpenModal } = React.useContext(ModalContext);

  React.useEffect(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        <div>
          <h1>Tarefas de </h1>
          <form>
            <Input id="tarefa" placeholder="Adicionar uma Tarefa" type="text" />
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
