import React from "react";
import { ModalContext } from "../context/ModalContext";

export default function Dashboard() {
  const { setModal } = React.useContext(ModalContext);

  React.useEffect(() => {
    setModal(false);
  }, []);

  return <div>dashboard</div>;
}
