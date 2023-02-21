import { useEffect, ChangeEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTarefasContext } from "../../Context/TarefasContext";
import { Loading } from "../Forms/Loading";
import styles from "./Edit.module.scss";

const Edit = () => {
  const { getEditTask, editTask, deleteTasks, updateTask } =
    useTarefasContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) getEditTask(id);
  }, []);

  const saveChanges = () => {
    if (titleRef.current !== null && descRef.current !== null && id)
      if (titleRef.current?.innerText.length !== 0) {
        updateTask(id, titleRef.current.innerText, descRef.current.innerText);
      } else alert("Defina um título para a tarefa");
  };

  if (!editTask)
    return (
      <div className="loading-container">
        <Loading
          border="5px solid #d9d9d9"
          borderTop="5px solid #0e38cc"
          height="60px"
          width="60px"
        />
      </div>
    );
  return (
    <div className={`${styles.container} row`}>
      <div className={styles.data}>
        <p className={styles.info}>Clique sobre o texto para editá-lo</p>
        <div className={`${styles.title} row`}>
          <p>{editTask.data().data}</p>
          <div
            contentEditable
            suppressContentEditableWarning={true}
            id="titulo"
            className={styles.titleData}
            ref={titleRef}
          >
            {editTask.data().titulo}
          </div>
        </div>
        <div
          contentEditable
          suppressContentEditableWarning={true}
          id="descricao"
          className={styles.descData}
          ref={descRef}
        >
          {editTask.data().descricao}
        </div>
      </div>

      <div className={styles.actions}>
        <div>
          <button
            className={styles.cancelar}
            onClick={() => {
              id && deleteTasks(id);
              navigate("/dashboard/tarefas");
            }}
          >
            Excluir
          </button>
          <button className={styles.save} onClick={saveChanges}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
