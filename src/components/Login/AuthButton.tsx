import React from "react";
import styles from "./AuthButton.module.scss";

interface ButtonProps {
  value: string;
  background?: string;
  border?: string;
  radius?: string;
  onClick?: () => void;
}

export function AuthButton({
  value,
  background,
  border,
  radius,
  onClick,
}: ButtonProps) {
  const session = false;

  return session ? (
    <div>oi</div>
  ) : (
    <button
      className={styles.button}
      style={{ background: background, border: border, borderRadius: radius }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
