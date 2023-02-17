import { FormEvent } from "react";
import { useTarefas } from "../../Context/TarefasContext";
import useForm from "../../Hooks/useForm";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import styles from "./Adicionar.module.scss";

const Adicionar = () => {
  const titulo = useForm();
  const { createTasks } = useTarefas();

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titulo.validate()) createTasks();
  };

  return (
    <div className={`${styles.container} row`}>
      <form className={`${styles.form} col-md-6 col-12`} onSubmit={submitData}>
        <h2>O que você está pensando...</h2>
        <Input id="title" type="text" placeholder="Título" {...titulo} />
        <textarea id="description" placeholder="Descrição"></textarea>
        <div className={styles.button}>
          <Button value="Adicionar" borderRadius="3px" />
        </div>
      </form>
      <div className={`${styles.image} col-md-6 col-12`}></div>
    </div>
  );
};

export default Adicionar;
