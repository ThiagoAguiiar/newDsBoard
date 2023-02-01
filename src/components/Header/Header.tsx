import React from "react";
import { ModalContext, useModal } from "../../context/ModalContext";
import { Profile } from "../Dashboard/Profile";
import { AuthButton } from "../Login/AuthButton";
import { LoginForm } from "../Login/LoginForm";
import { Logo } from "./Logo";
import styles from "./Header.module.scss";

export function Header() {
  // Mostrando o Formulário de Login
  const modal = useModal();
  const token = localStorage.getItem("token");

  function showModal() {
    modal.setIsOpenModal(true);
  }

  return (
    <>
      <header className={styles.header}>
        <nav>
          <Logo
            fontSize="1.8rem"
            color="#0151eb"
            disabledLink={token ? true : false}
          />

          {token ? (
            <Profile />
          ) : (
            <AuthButton
              value="Entrar"
              background="#ffffffff"
              border="1px solid #0151eb"
              radius=".2rem"
              onClick={showModal}
            />
          )}
        </nav>
      </header>

      {modal.isOpenModal && <LoginForm />}
    </>
  );
}
