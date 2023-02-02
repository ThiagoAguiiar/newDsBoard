import React, { ReactNode } from "react";

type ModalOpacityProps = {
  children: React.ReactNode | ReactNode[];
};

// Opacidade do fundo dos Modais
export function ModalOpacity({ children }: ModalOpacityProps): JSX.Element {
  return <div className="modal-opacity">{children}</div>;
}
