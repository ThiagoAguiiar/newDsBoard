import React from "react";
import isEmail from "validator/lib/isEmail";
import { useTarefasContext } from "../Context/TarefasContext";

// Biblioteca validator para validar os dados
const validation = {
  email: {
    validate: (value: string): boolean => isEmail(value),
  },
};

// Recebe um tipo que pertence a chave do tipo validation
const useForm = (type?: keyof typeof validation) => {
  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  // Redefinindo mensagens de erro
  const { setStatus } = useTarefasContext();

  // Validação dos valores dos inputs
  const validate = (value: string): boolean => {
    if (value.length === 0) {
      setError("Preencha o campo corretamente");
      return false;
    } else if (type && !validation[type].validate(value)) {
      setError("Email inválido");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  // onChange Event Input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      validate(e.target.value);
    }

    setStatus(null);
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
