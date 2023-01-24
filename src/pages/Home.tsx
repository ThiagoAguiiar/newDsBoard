import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Forms/Button";
import { Logo } from "../components/Header/Logo";
import styles from "./Home.module.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          Organize suas tarefas do dia com o <Logo color="#0151eb" />
        </h1>
        <p>
          Controle seus horários, defina metas e priorize atividades. Faça o seu
          dia ser mais produtivo.
        </p>
        <div className={styles.button}>
          <Button
            value="Começar"
            borderRadius="3px"
            fontSize="1rem"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
      <div className={styles.background}>
        <div></div>
      </div>
    </div>
  );
}
