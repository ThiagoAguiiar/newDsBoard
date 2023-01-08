import React from "react";
import styles from "./LoginForm.module.scss";
import { ModalContext } from "../../context/ModalContext";
import { GrClose } from "react-icons/gr";
import { Input } from "../Forms/Input";
import { Link } from "react-router-dom";
import { Button } from "../Forms/Button";
import { useForm } from "../../hooks/useForm";
import { ServicesButton } from "./ServicesButton";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../../context/UserContext";
import { Error } from "../Forms/Error";

// Modal com Formulário de Login
export function LoginForm() {
  const { setModal } = React.useContext(ModalContext);
  const { loginUser, loading, errorUser, setErrorUser } =
    React.useContext(UserContext);

  React.useEffect(() => {
    setErrorUser(null);
  }, []);

  const email = useForm("email");
  const password = useForm();

  function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      loginUser(email.value, password.value);
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
              value={loading ? "Carregando..." : "Entrar"}
              borderRadius="3px"
              fontSize="1rem"
            />
          </div>
          <div className={styles.Auth}>
            <ServicesButton
              service={"Entrar com o Google"}
              icon={<FcGoogle size={30} />}
            />
          </div>
          <div style={{ textAlign: "center", paddingTop: "1.2rem" }}>
            <Error error={errorUser} />
          </div>
        </form>
      </div>
      <div className={styles.cadastrar}>
        <Link to="/cadastrar">Criar uma conta</Link>
      </div>
    </ModalOpacity>
  );
}

interface ModalOpacityProps {
  children: React.ReactNode;
}

// Opacidade do fundo do Modal
export function ModalOpacity({ children }: ModalOpacityProps): JSX.Element {
  return <div className="modal-opacity">{children}</div>;
}
