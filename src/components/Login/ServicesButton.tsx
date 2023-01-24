import React from "react";
import { MouseEventHandler } from "react";
import styles from "./ServicesButton.module.scss";

interface ServicesButtonProps {
  service: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: unknown;
}

export function ServicesButton({
  service,
  onClick,
  icon,
}: ServicesButtonProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        <>{icon}</>
        <>{service}</>
      </button>
    </div>
  );
}
