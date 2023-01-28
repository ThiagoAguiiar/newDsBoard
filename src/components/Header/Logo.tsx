import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

// Tipagem dos parâmetros do Componente
interface LogoProps {
  color?: string;
  fontSize?: string;
  disabledLink?: boolean;
}

export function Logo({ color, fontSize, disabledLink }: LogoProps) {
  return (
    <Link
      to={disabledLink ? "/dashboard" : "/"}
      className={styles.logo}
      style={{ fontSize: fontSize }}
    >
      Ds<span style={{ color: color }}>Board</span>
    </Link>
  );
}
