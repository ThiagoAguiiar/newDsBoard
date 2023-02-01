import React from "react";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { useModal } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import styles from "./Register.module.scss";

export default function Register() {
  const email = useForm("email");
  const password = useForm();
  const modal = useModal();

  const inputFields = [
    {
      id: "email",
      placeholder: "Email",
      type: "text",
      other: email,
    },
    {
      id: "password",
      placeholder: "Senha",
      type: "password",
      other: password,
    },
  ];

  return (
    <div className={styles.container}>
      <form className={`${styles.form} animateLeft`}>
        <div className={styles.title}>
          <h1>Criar uma nova conta</h1>
        </div>
        <div className={styles.body}>
          {inputFields.map((item, index) => (
            <div key={index} style={{ marginBottom: ".5rem" }}>
              <Input
                id={item.id}
                placeholder={item.placeholder}
                type={item.type}
                {...item.other}
              />
            </div>
          ))}

          <div style={{ marginTop: "1.2rem" }}>
            <Button value="Cadastrar" borderRadius="3px" fontSize="1rem" />
          </div>
        </div>
        <p className={styles.haveAccount}>
          Possui uma conta?
          <span onClick={() => modal.setIsOpenModal(true)}> Fazer login</span>
        </p>
      </form>
    </div>
  );
}
