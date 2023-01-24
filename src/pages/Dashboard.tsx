import React from "react";
import { ModalContext } from "../context/ModalContext";

interface UserDataProps {
  name: string;
  email: string;
  photo: string;
}

export default function Dashboard() {
  const { setModal } = React.useContext(ModalContext);
  const [data, setData] = React.useState<null | UserDataProps>(null);

  React.useEffect(() => {
    setModal(false);
    const local = localStorage.getItem("user");
    if (local) setData(JSON.parse(local));
  }, []);

  return (
    <div>
      <h1>Olá, {data?.name} </h1>
    </div>
  );
}
