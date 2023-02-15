import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import Profile from "../Profile/Profile";
import styles from "./Header.module.scss";

type BackgroundType = {
  background: string;
  color: string;
};

const Header = () => {
  const { login, autoLogin, getUserData } = useUserContext();
  const [background, setBackground] = useState<BackgroundType>({
    background: "#fff",
    color: "#000",
  });
  const { pathname } = useLocation();

  useEffect(() => {
    autoLogin();
    getUserData();
  }, []);

  useEffect(() => {
    if (pathname === "/")
      setBackground({
        background: "#000",
        color: "#fff",
      });
    else
      setBackground({
        background: "#fff",
        color: "#000",
      });
  }, [pathname]);

  return (
    <header className={styles.header} style={background && { ...background }}>
      <nav>
        <div className={styles.logo}>
          <Link to={login ? "/dashboard" : "/"}>
            <span>DsBoard</span>
          </Link>
        </div>
        <div className={styles.login}>
          {login ? <Profile /> : <Link to="/login">Entrar</Link>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
