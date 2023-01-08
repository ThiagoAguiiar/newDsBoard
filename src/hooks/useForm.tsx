import React from "react";
import isEmail from "validator/lib/isEmail";
import { UserContext } from "../context/UserContext";

const validation = {
  email: {
    validate: (value: string): boolean => isEmail(value),
  },
};

// Recebe um tipo (type input)
export function useForm(type?: keyof typeof validation) {
  const { setErrorUser } = React.useContext(UserContext);
  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  // Validação dos valores dos inputs
  function validate(value: string): boolean {
    if (value.length === 0) {
      setError("Preencha o campo");
      return false;
    } else if (type && !validation[type].validate(value)) {
      setError("Email inválido");
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  // onChange Event Input
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorUser(null);

    if (error) {
      validate(e.target.value);
    }

    setValue(e.target.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
}
