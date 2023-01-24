import React from "react";
import { Button } from "../components/Forms/Button";
import { Input } from "../components/Forms/Input";
import { ModalContext } from "../context/ModalContext";
import { useForm } from "../hooks/useForm";
import { FiPaperclip } from "react-icons/fi";
import { RiNumber5 } from "react-icons/ri";
import styles from "./Dashboard.module.scss";

interface UserDataProps {
  name: string;
  email: string;
  photo: string;
}

export default function Dashboard() {
  const { setModal } = React.useContext(ModalContext);
  const [data, setData] = React.useState<null | UserDataProps>(null);

  const task = useForm();

  React.useEffect(() => {
    setModal(false);
    const local = localStorage.getItem("user");
    if (local) setData(JSON.parse(local));
  }, []);

  function submitTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (task.validate()) {
      console.log(e.target);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        <div>
          <h1>Tarefas de {data?.name ? data?.name : "Usuário"}</h1>
          <form onSubmit={submitTarefa}>
            <Input
              id="tarefa"
              placeholder="Adicionar uma Tarefa"
              type="text"
              {...task}
            />
            <div className={styles.actions}>
              <label htmlFor="archive">
                <FiPaperclip />
                <p>arquivo</p>
              </label>
              <Input id="archive" placeholder="" type="file" />
            </div>
            <div className={styles.button}>
              <Button
                value="Adicionar Tarefa"
                borderRadius="3px"
                fontSize="1rem"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
