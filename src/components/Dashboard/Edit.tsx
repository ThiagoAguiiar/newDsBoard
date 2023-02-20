import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTarefasContext } from "../../Context/TarefasContext";
import { Loading } from "../Forms/Loading";
import styles from "./Edit.module.scss";

const Edit = () => {
  const { getEditTask, editTask } = useTarefasContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) getEditTask(id);
  }, []);

  console.log(editTask);

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
      <div>
        <div className={`${styles.title} row`}>
          <h1>{editTask.data().titulo}</h1>
          <p>{editTask.data().date}</p>
        </div>
        <p>{editTask.data().descricao}</p>
      </div>
    </div>
  );
};

export default Edit;
