import React from "react";
import { LoginContext } from "../../context/LoginContext";

export function Profile() {
  const { logoutUser } = React.useContext(LoginContext);

  return (
    <div>
      <button onClick={() => logoutUser()}>Sair</button>
    </div>
  );
}
