import React from "react";

interface IProvider {
  children: JSX.Element;
}

// Tipagem dos parâmetros do contexto
interface IContext {
  isOpenModal: boolean;
  setIsOpenModal: (state: boolean) => void;
}

// Valores iniciais dos estados do componente
const initialValue = {
  isOpenModal: false,
  setIsOpenModal: () => undefined,
};

export const ModalContext = React.createContext<IContext>(initialValue);

export const ModalProvider = ({ children }: IProvider) => {
  const [isOpenModal, setIsOpenModal] = React.useState(
    initialValue.isOpenModal
  );

  return (
    <ModalContext.Provider value={{ isOpenModal, setIsOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
};
