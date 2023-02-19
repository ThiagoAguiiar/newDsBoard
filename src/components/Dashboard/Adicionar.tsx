import { FormEvent, ChangeEvent, useState } from "react";
import { useTarefasContext } from "../../Context/TarefasContext";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import styles from "./Adicionar.module.scss";

const Adicionar = () => {
  const titulo = useForm();
  const { createTasks, loading, status, setStatus } = useTarefasContext();
  const [descricao, setDescricao] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
    setStatus(null);
  };

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titulo.validate()) {
      createTasks(titulo.value, descricao);
    }
  };

  return (
    <div className={`${styles.container} row`}>
      <form className={`${styles.form}  col-md-6 col-12`} onSubmit={submitData}>
        <h2>O que você está pensando...</h2>
        <Input id="title" type="text" placeholder="Título" {...titulo} />
        <textarea
          id="description"
          placeholder="Descrição"
          onChange={handleChange}
        ></textarea>
        <div className={styles.button}>
          <Button
            value={loading ? "Enviando..." : "Enviar"}
            borderRadius="3px"
          />
        </div>

        <div className={`${styles.status} `}>
          {status && (
            <p style={{ color: status.error === 200 ? "green" : "red" }}>
              {status.msg}
            </p>
          )}
        </div>
      </form>

      <div className="col-md-6"></div>
    </div>
  );
};

export default Adicionar;
