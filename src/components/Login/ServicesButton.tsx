import React from "react";
import { MouseEventHandler } from "react";
import styles from "./ServicesButton.module.scss";

interface ServicesButtonProps {
  service: string;
  event?: MouseEventHandler<HTMLButtonElement>;
  icon: unknown;
}

export function ServicesButton({ service, event, icon }: ServicesButtonProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={event}>
        <>{icon}</>
        <>{service}</>
      </button>
    </div>
  );
}
