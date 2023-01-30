import React from "react";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { Error } from "./Error";
import styles from "./Input.module.scss";

interface InputProps {
  value?: string;
  id: string;
  placeholder?: string;
  type: string;
  error?: string | null;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Input({
  value,
  id,
  placeholder,
  type,
  error,
  onBlur,
  onChange,
}: InputProps): JSX.Element {
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
}
