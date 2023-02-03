import React from "react";
import { forgotPassword } from "../api/Password";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { useModal } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import styles from "./Password.module.scss";

export default function Password() {
  const email = useForm("email");
  const modal = useModal();

  React.useEffect(() => {
    modal.setIsOpenModal(false);
  }, []);

  const submitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.validate()) {
      forgotPassword();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Esqueceu sua senha?</h1>
        <p>
          Caso seu email esteja cadastrado em nosso sistema, você receberá um
          documento com a nova senha.
        </p>
        <form onSubmit={submitEmail} style={{ width: "500px" }}>
          <Input id="email" type="email" {...email} placeholder="Email" />
          <div style={{ width: "150px" }}>
            <Button value="Enviar" borderRadius="3px" fontSize="1rem" />
          </div>
        </form>
      </div>
    </div>
  );
}
