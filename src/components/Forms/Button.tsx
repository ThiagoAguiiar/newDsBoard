import React, { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface ButtonTypes {
  value: string;
  fontSize?: string;
  borderRadius?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  value,
  fontSize,
  borderRadius,
  onClick,
}: ButtonTypes): JSX.Element {
  return (
    <button
      className={styles.button}
      style={{ borderRadius: borderRadius, fontSize: fontSize }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
