import { useEffect } from "react";
import { useTarefasContext } from "../../Context/TarefasContext";
import { Loading } from "../Forms/Loading";
import styles from "./Tarefas.module.scss";
import { RiListCheck2 } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";

const Tarefas = () => {
  const { getAllTasks, loading, tasks } = useTarefasContext();

  useEffect(() => {
    getAllTasks();
    console.log(tasks);
  }, []);

  if (loading)
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
      <div className={styles.tasks}>
        {tasks?.map((task: any, index: any) => (
          <div className={`${styles.item} row`} key={index}>
            <div className="col-md-6 col-12">
              <h1>{task.titulo}</h1>
              <p className={styles.description}>{task.descricao}</p>
            </div>
            <div className="col-md-6 col-12">
              <div className={styles.actions}>
                <button className={styles.edit}>
                  <RiListCheck2 />
                </button>
                <button className={styles.delete}>
                  <TbTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tarefas;
