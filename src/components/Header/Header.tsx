import React from "react";
import { ModalContext } from "../../context/ModalContext";
import { AuthButton } from "../Login/AuthButton";
import { LoginForm } from "../Login/LoginForm";
import styles from "./Header.module.scss";
import { Logo } from "./Logo";

export function Header() {
  const { modal, setModal } = React.useContext(ModalContext);

  function showModal() {
    setModal(true);
  }

  return (
    <>
      <header className={styles.header}>
        <nav>
          <Logo fontSize="1.8rem" color="#0151eb" />
          <AuthButton
            value="Entrar"
            background="#ffffffff"
            border="1px solid #0151eb"
            radius=".2rem"
            onClick={showModal}
          />
        </nav>
      </header>

      {modal && <LoginForm />}
    </>
  );
}
