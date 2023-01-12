import React from "react";
import { Button } from "../components/Forms/Button";
import { Error } from "../components/Forms/Error";
import { Input } from "../components/Forms/Input";
import { Loading } from "../components/Other/Loading";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm";
import styles from "./Register.module.scss";

export default function Register() {
  const { cadastrarUsuario, errorAuth, loading } =
    React.useContext(UserContext);
  const { setModal } = React.useContext(ModalContext);

  const name = useForm();
  const email = useForm("email");
  const password = useForm();

  const inputFields = [
    {
      id: "name",
      placeholder: "Nome",
      type: "text",
      other: name,
    },
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

  function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.validate() && password.validate() && name.validate()) {
      cadastrarUsuario(email.value, password.value);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitData}>
        <div className={styles.title}>
          <h1>Criar uma conta</h1>
          <p>
            Organize e gerencie suas tarefas facilmente com o DsBoard.
            Cadastre-se gratuitamente.
          </p>
        </div>
        <div className={styles.body}>
          {inputFields.map((item, index) => (
            <Input
              key={index}
              id={item.id}
              placeholder={item.placeholder}
              type={item.type}
              {...item.other}
            />
          ))}

          <div style={{ marginTop: "1.2rem" }}>
            <Button
              value={
                loading ? (
                  <Loading
                    width="30px"
                    height="30px"
                    border="5px solid #ffffff"
                    borderTop="5px solid #0E38CC"
                  />
                ) : (
                  "Cadastrar"
                )
              }
              borderRadius="3px"
              fontSize="1rem"
            />
          </div>
        </div>
        <p className={styles.haveAccount}>
          Possui uma conta?{" "}
          <span onClick={() => setModal(true)}>Fazer login</span>
        </p>
        <Error error={errorAuth} />
      </form>
    </div>
  );
}
