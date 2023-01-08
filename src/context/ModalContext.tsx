import React from "react";

const defaultValue = {
  modal: false,
  setModal: () => undefined,
};

interface ModalContextProps {
  modal: boolean;
  setModal: (state: boolean) => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext =
  React.createContext<ModalContextProps>(defaultValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = React.useState(defaultValue.modal);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
