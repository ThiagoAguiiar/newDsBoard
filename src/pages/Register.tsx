import useForm from "../Hooks/useForm";
import styles from "./Login.module.scss";
import { Button } from "../Components/Forms/Button";
import { Error } from "../Components/Forms/Error";
import { Input } from "../Components/Forms/Input";
import { useUserContext } from "../Context/UserContext";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { error, createAccount, loading } = useUserContext();
  const { createAccountLoading } = loading;

  const email = useForm("email");
  const password = useForm();

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.validate() && password.validate())
      createAccount(email.value, password.value);
  };

  return (
    <div className={`${styles.container} row`}>
      <div className={`${styles.background} col-md-6 col-12`}>
        <div>
          <div className={styles.glassMorphism}>
            <h1>É Trabalho</h1>
            <h1>É Estudo</h1>
            <h1>É Academia</h1>
            <h1>É DsBoard</h1>
          </div>
        </div>
      </div>

      <form className="col-md-6 col-12 animateForm" onSubmit={registerUser}>
        <h1>Criar uma conta</h1>
        <div className={styles.input}>
          <Input id="email" type="text" placeholder="Email" {...email} />
        </div>
        <div className={styles.input}>
          <Input
            id="password"
            type="password"
            placeholder="Senha"
            {...password}
          />
        </div>
        <div className={styles.button}>
          <Button
            value={createAccountLoading ? "Carregando..." : "Criar conta"}
            borderRadius="3px"
          />
          <span className={styles.login}>
            Possui uma conta?
            <Link to="/login">Fazer login</Link>
          </span>
          <Error error={error} />
        </div>
      </form>
    </div>
  );
};

export default Register;
