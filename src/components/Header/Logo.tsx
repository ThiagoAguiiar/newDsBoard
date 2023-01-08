import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

// Tipagem dos parâmetros do Componente
interface LogoProps {
  color?: string;
  fontSize?: string;
}

export function Logo({ color, fontSize }: LogoProps) {
  return (
    <Link to="/" className={styles.logo} style={{ fontSize: fontSize }}>
      Ds<span style={{ color: color }}>Board</span>
    </Link>
  );
}
