import React from "react";
import styles from "./LoginForm.module.scss";
import { GrClose } from "react-icons/gr";
import { Input } from "../Forms/Input";
import { Link } from "react-router-dom";
import { Button } from "../Forms/Button";
import { ServicesButton } from "./ServicesButton";
import { FcGoogle } from "react-icons/fc";
import { ModalContext } from "../../context/ModalContext";
import { useForm } from "../../hooks/useForm";
import { LoginContext } from "../../context/LoginContext";
import { Loading } from "../Other/Loading";

interface ModalOpacityProps {
  children: React.ReactNode;
}

export function LoginForm() {
  // Fechando o Modal de Login
  const { setIsOpenModal } = React.useContext(ModalContext);
  const { loginWithEmailPassword, loginWithGoogleAccount, loading } =
    React.useContext(LoginContext);

  // Validando os campos do formulário
  const email = useForm("email");
  const password = useForm();

  function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.validate() && password.validate())
      loginWithEmailPassword(email.value, password.value);
  }

  return (
    <ModalOpacity>
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <div
            className={styles.btnClose}
            onClick={() => setIsOpenModal(false)}
          >
            <GrClose size={20} />
          </div>
          <h1>Fazer Login</h1>
          <p>Entrar na sua conta para continuar</p>
        </div>
        <form className={styles.modalBody} onSubmit={submitData}>
          <Input id="email" placeholder="Email" type="text" {...email} />
          <Input
            id="password"
            placeholder="Senha"
            type="password"
            {...password}
          />
          <div className={styles.fgtPassword}>
            <Link to="/">Esqueceu sua senha?</Link>
          </div>
          <div style={{ marginTop: "1.2rem" }}>
            <Button
              value={
                loading ? (
                  <Loading
                    width="25px"
                    height="25px"
                    border="3px solid #ffffff"
                    borderTop="3px solid #0E38CC"
                  />
                ) : (
                  "Entrar"
                )
              }
              borderRadius="3px"
              fontSize="1rem"
            />
          </div>
          <div className={styles.Auth}>
            <ServicesButton
              service="Entrar com o Google"
              icon={<FcGoogle size={30} />}
              onClick={() => loginWithGoogleAccount()}
            />
          </div>
          <div style={{ textAlign: "center", paddingTop: "1.2rem" }}>
            <div className="cadastrar">
              <Link to="/register">Crie uma conta</Link>
            </div>
          </div>
        </form>
      </div>
    </ModalOpacity>
  );
}

// Opacidade do fundo do Modal
export function ModalOpacity({ children }: ModalOpacityProps): JSX.Element {
  return <div className="modal-opacity">{children}</div>;
}
