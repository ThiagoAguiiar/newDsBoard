import React from "react";
import styles from "./LoginForm.module.scss";
import { ModalContext } from "../../context/ModalContext";
import { GrClose } from "react-icons/gr";
import { Input } from "../Forms/Input";
import { Link, Navigate } from "react-router-dom";
import { Button } from "../Forms/Button";
import { useForm } from "../../hooks/useForm";
import { ServicesButton } from "./ServicesButton";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../../context/UserContext";
import { Error } from "../Forms/Error";
import { Loading } from "../Other/Loading";

interface ModalOpacityProps {
  children: React.ReactNode;
}

export function LoginForm() {
  React.useEffect(() => {
    setErrorAuth(null);
  }, []);

  const token = localStorage.getItem("token");
  const { setModal } = React.useContext(ModalContext);
  const { loginUsuario, loginGoogle, loading, errorAuth, setErrorAuth } =
    React.useContext(UserContext);

  const email = useForm("email");
  const password = useForm();

  function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      loginUsuario(email.value, password.value);
    }
  }

  return (
    <ModalOpacity>
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <div className={styles.btnClose} onClick={() => setModal(false)}>
            <GrClose size={20} />
          </div>
          <h1>Fazer Login</h1>
          <p>Entrar na sua conta para continuar</p>
        </div>
        <form onSubmit={submitData} className={styles.modalBody}>
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
              service={loading ? "Carregando..." : "Entrar com o Google"}
              icon={<FcGoogle size={30} />}
              onClick={() => loginGoogle()}
            />
          </div>
          <div style={{ textAlign: "center", paddingTop: "1.2rem" }}>
            <Error error={errorAuth} />
            <div className="cadastrar">
              <Link to="/register" onClick={() => setModal(false)}>
                Crie uma conta
              </Link>
            </div>
          </div>
        </form>
      </div>
      {token && <Navigate to="/dashboard" />}
    </ModalOpacity>
  );
}

// Opacidade do fundo do Modal
export function ModalOpacity({ children }: ModalOpacityProps): JSX.Element {
  return <div className="modal-opacity">{children}</div>;
}
