import React from "react";
import styles from "./TaskDetails.module.scss";
import { ModalOpacity } from "../Modal/OpacityModal";

export const TaskDetails = () => {
  return (
    <ModalOpacity>
      <div className={styles.container}></div>
    </ModalOpacity>
  );
};
