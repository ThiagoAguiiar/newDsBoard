import { ChangeEventHandler, FocusEventHandler } from "react";
import { Error } from "./Error";
import styles from "./Input.module.scss";

type InputTypeProps = {
  value?: string;
  id: string;
  placeholder?: string;
  type: string;
  error?: string | null;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Input = ({
  value,
  id,
  placeholder,
  type,
  error,
  onBlur,
  onChange,
}: InputTypeProps) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        className={styles.input}
        onBlur={onBlur}
        onChange={onChange}
        autoComplete="off"
      />
      <Error error={error} />
    </div>
  );
};
