import React, { useContext } from "react";

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

  const setInternalIsOpenModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  return (
    <ModalContext.Provider
      value={{ isOpenModal, setIsOpenModal: setInternalIsOpenModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Erro ao usar ModalContext");
  return context;
};
