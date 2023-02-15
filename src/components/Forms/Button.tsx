import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

type ButtonTypeProps = {
  value: string | JSX.Element;
  fontSize?: string;
  borderRadius?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function Button({
  value,
  fontSize,
  borderRadius,
  className,
  disabled,
  onClick,
}: ButtonTypeProps): JSX.Element {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={{ borderRadius: borderRadius, fontSize: fontSize }}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
