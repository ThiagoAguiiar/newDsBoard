import React from "react";
import { useLogin } from "../../context/LoginContext";
import { MdOutlineExitToApp } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import styles from "./Profile.module.scss";
import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData";

export function Profile() {
  const login = useLogin();
  const data = useData();

  return (
    <div className={styles.container}>
      <Link to={data?.localToken}>
        <BiUserCircle size="20px" />
        <span>{data?.userData.name ? data.userData.name : "Usuário"}</span>
      </Link>

      <button onClick={() => login.logout()} className={styles.logoutBtn}>
        <MdOutlineExitToApp size="18px" />
        Sair
      </button>
    </div>
  );
}
