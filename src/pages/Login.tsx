import useForm from "../Hooks/useForm";
import styles from "./Login.module.scss";
import { Button } from "../Components/Forms/Button";
import { Error } from "../Components/Forms/Error";
import { Input } from "../Components/Forms/Input";
import { useUserContext } from "../Context/UserContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const email = useForm("email");
  const password = useForm();
  const navigate = useNavigate();
  const { credentialsLogin, loading, error, googleLogin } = useUserContext();
  const { credentialLoginLoading, googleLoginLoading } = loading;

  const checkLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.validate() && password.validate())
      credentialsLogin(email.value, password.value);
  };

  return (
    <div className={`${styles.container} row`}>
      <div className={`${styles.background} col-md-6 col-12`}>
        <div></div>
      </div>

      <form className="col-md-6 col-12 animateForm" onSubmit={checkLogin}>
        <h1>Fazer Login</h1>
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
            value={credentialLoginLoading ? "Carregando..." : "Entrar"}
            borderRadius="3px"
          />
          <span className={styles.forgot} onClick={() => navigate("/password")}>
            Esqueceu sua senha?
          </span>
          <div className={styles.google}>
            <div onClick={googleLogin}>
              <FcGoogle size="1.5rem" />
              <p>
                {googleLoginLoading ? "Carregando..." : "Login com o Google"}
              </p>
            </div>
          </div>
          <Link to="/register" className={styles.createAccount}>
            Criar conta gratuitamente
          </Link>
          {error && <Error error={error} />}
        </div>
      </form>
    </div>
  );
};

export default Login;
