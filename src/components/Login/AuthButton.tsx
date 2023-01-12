import React from "react";
import { Profile } from "../Dashboard/Profile";
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
  const session = localStorage.getItem("token");

  return session ? (
    <Profile />
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
