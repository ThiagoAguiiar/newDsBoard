import React from "react";
import { useLogin } from "../../context/LoginContext";
import { MdOutlineExitToApp } from "react-icons/md";
import styles from "./Profile.module.scss";

type DataType = {
  name: string;
  email: string;
  photo: string;
};

export function Profile() {
  const login = useLogin();
  const [data, setData] = React.useState<null | DataType>(null);

  React.useEffect(() => {
    const local = localStorage.getItem("user-data");
    if (local) setData(JSON.parse(local));
    console.log(data);
  }, []);

  return (
    <div>
      <button onClick={() => login.logout()} className={styles.logoutBtn}>
        <MdOutlineExitToApp size="18px" />
        Sair
      </button>
    </div>
  );
}
