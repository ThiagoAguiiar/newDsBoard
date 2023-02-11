import React from "react";
import styles from "./Profile.module.scss";
import { useLogin } from "../../context/LoginContext";
import { MdOutlineExitToApp } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Profile() {
  const { token, data } = useLogin();
  const { logout } = useLogin();

  return (
    <div className={styles.container}>
      <Link to={token!}>
        <BiUserCircle size="20px" />
        <span>{data ? data.name : "Usuário"}</span>
      </Link>

      <button onClick={logout} className={styles.logoutBtn}>
        <MdOutlineExitToApp size="18px" />
        Sair
      </button>
    </div>
  );
}
