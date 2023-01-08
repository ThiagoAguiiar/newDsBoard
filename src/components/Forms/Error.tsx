import React from "react";
import styles from "./Error.module.scss";

interface ErrorProps {
  error: string | null | undefined;
}

export function Error({ error }: ErrorProps) {
  return <p className={styles.error}>{error}</p>;
}
