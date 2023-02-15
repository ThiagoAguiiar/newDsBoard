import styles from "./Loading.module.scss";

interface LoadingProps {
  width: string;
  height: string;
  border: string;
  borderTop: string;
}

export function Loading({ width, height, border, borderTop }: LoadingProps) {
  return (
    <div
      className={styles.loading}
      style={{
        width: width,
        height: height,
        border: border,
        borderTop: borderTop,
      }}
    ></div>
  );
}
