import { FormEvent, useState } from "react";
import { Button } from "../Components/Forms/Button";
import { Error } from "../Components/Forms/Error";
import { Input } from "../Components/Forms/Input";
import { useUserContext } from "../Context/UserContext";
import useForm from "../Hooks/useForm";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const email = useForm("email");
  const [disabled, setDisabled] = useState<boolean>(false);
  const { forgotPassword, loading, error } = useUserContext();
  const { forgotPasswordLoading } = loading;

  const redefinePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.validate()) forgotPassword(email.value);
    setDisabled(true);
  };

  return (
    <form onSubmit={redefinePassword} className={styles.form}>
      <div className={`${styles.formContainer} row`}>
        <div>
          <h2>Alterar sua senha</h2>
          <p className={styles.subTitle}>
            Digite seu email cadastrado na plataforma para recuperação de senha
          </p>
          <div className={styles.input}>
            <Input id="email" type="text" placeholder="Email" {...email} />
            <div className={styles.button}>
              <Button
                value={forgotPasswordLoading ? "Carregando..." : "Enviar"}
                borderRadius="3px"
              />
            </div>
          </div>
          {error && <Error error={error} />}
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
