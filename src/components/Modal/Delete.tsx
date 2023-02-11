import React from "react";
import styles from "./Delete.module.scss";
import btn from "../Forms/Button.module.scss";
import { ModalOpacity } from "./OpacityModal";
import { GrClose } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";
import { Button } from "../Forms/Button";
import fileImg from "../../img/file.png";
import { useTask } from "../../context/TaskContext";

export function Delete() {
  const modal = useModal();
  const { getAllTasks } = useTask();

  return (
    <ModalOpacity>
      <div className={styles.container}>
        <div
          className={styles.closeBtn}
          onClick={() => modal.setIsDeleteModal(false)}
        >
          <GrClose size={20} />
        </div>
        <div className={styles.body}>
          <img src={fileImg} />
          <h4>Excluir Tarefa</h4>
          <p>Sua atividade será deletada permanentemente</p>
        </div>

        <div className={styles.actions}>
          <Button
            value="Cancelar"
            borderRadius="3px"
            onClick={() => modal.setIsDeleteModal(false)}
          />
          <button
            className={`${btn.button} ${styles.confirm}`}
            onClick={() => {
              modal.setIsDeleteModal(false);
              getAllTasks();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </ModalOpacity>
  );
}
