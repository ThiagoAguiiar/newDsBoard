import React from "react";
import { UserContext } from "../../context/UserContext";

interface UserDataProps {
  name: string;
  email: string;
  photo: string;
}

export function Profile() {
  const { logoutUsuario } = React.useContext(UserContext);
  const [data, setData] = React.useState<null | UserDataProps>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    if (userData) setData(JSON.parse(userData));
  }, []);

  return (
    <div>
      {data?.name ? data.name : "Olá, usuário"}
      <button onClick={() => logoutUsuario()}>Sair</button>
    </div>
  );
}
