import styles from "./Error.module.scss";

type ErrorTypeProps = {
  error: string | null | undefined;
};

export function Error({ error }: ErrorTypeProps) {
  return <p className={styles.error}>{error}</p>;
}
