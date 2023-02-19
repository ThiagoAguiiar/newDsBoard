import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AiOutlinePlus, AiOutlineFolder } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import styles from "./Dashboard.module.scss";
import { useUserContext } from "../Context/UserContext";
import { Loading } from "../Components/Forms/Loading";
import { useTarefasContext } from "../Context/TarefasContext";

const Dashboard = () => {
  const [title, setTitle] = useState<string>("Dashboard");
  const { setStatus } = useTarefasContext();
  const { pathname } = useLocation();
  const { data } = useUserContext();

  useEffect(() => {
    if (pathname.includes("adicionar")) setTitle("Adicionar Tarefa");
    else if (pathname.includes("tarefas")) setTitle("Suas Tarefas");
    else if (pathname.includes("documentos")) setTitle("Seus Documentos");
    else setTitle("Dashboard");

    setStatus(null);
  }, [pathname]);

  if (!data)
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
    <div className={styles.container}>
      <header className={`${styles.header} row`}>
        <div className="col-md-3 col-4">
          <h3>{title}</h3>
        </div>
        <div className={`${styles.actions} col-md-9 col-8`}>
          <NavLink to="adicionar">
            <AiOutlinePlus />
          </NavLink>
          <NavLink to="tarefas">
            <BsGrid />
          </NavLink>
          <NavLink to="documentos">
            <AiOutlineFolder />
          </NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Dashboard;
