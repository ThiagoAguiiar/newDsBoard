import { useEffect } from "react";
import { useTarefasContext } from "../../Context/TarefasContext";
import { Loading } from "../Forms/Loading";
import styles from "./Tarefas.module.scss";
import { RiListCheck2 } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Image from "../../img/notTask.gif";
import { Button } from "../Forms/Button";

const Tarefas = () => {
  const { getAllTasks, loading, tasks, deleteTasks } = useTarefasContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  console.log(tasks);

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
  else
    return (
      <div className={`${styles.container} row`}>
        {tasks !== null && tasks.length !== 0 ? (
          <div className={styles.tasks}>
            {tasks.map((task: any, index: any) => (
              <div className={`${styles.item} row`} key={index}>
                <div className="col-md-6 col-12">
                  <h1>{task.data().titulo}</h1>
                  <p className={styles.description}>{task.data().descricao}</p>
                </div>
                <div className="col-md-6 col-12">
                  <div className={styles.actions}>
                    <button
                      className={styles.edit}
                      onClick={() => navigate(task.id)}
                    >
                      <RiListCheck2 />
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        deleteTasks(task.id);
                        getAllTasks();
                      }}
                    >
                      <TbTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.notTask}>
            <h3>Você não tem tarefas...</h3>
            <div>
              <Button value="Adicionar Tarefa" borderRadius="3px" />
            </div>
          </div>
        )}
      </div>
    );
};

export default Tarefas;
