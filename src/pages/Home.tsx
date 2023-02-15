import styles from "./Home.module.scss";
import { Fragment } from "react";
import { Button } from "../Components/Forms/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <section className={styles.sectionBackground}>
        <div className={`${styles.bContainer} row`}>
          <div className={`${styles.title} col-md-6 col-12`}>
            <h1>Organize suas tarefas do dia com o DsBoard</h1>
            <p>
              Controle seus horários, defina metas e faça do seu dia mais
              produtivo
            </p>
          </div>
          <div className={`${styles.background} col-md-6`}></div>
        </div>
        <div className={styles.lineContainer}>
          <span className={styles.line}></span>
        </div>
      </section>

      <section className={`${styles.info} row`}>
        <div className="row">
          <div className={`${styles.infoTitle} col-md-10`}>
            <h2>Facilidade e Produtividade</h2>
          </div>
          <div className="col-md-2">
            <div style={{ width: "80%" }}>
              <Button
                value="Começar"
                borderRadius="3px"
                onClick={() => navigate("/register")}
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
