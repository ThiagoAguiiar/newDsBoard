import React, { useContext, useState } from "react";

interface IProvider {
  children: JSX.Element;
}

// Tipagem dos parâmetros do contexto
interface IContext {
  isOpenModal: boolean;
  setIsOpenModal: (state: boolean) => void;
  isDeleteModal: boolean;
  setIsDeleteModal: (state: boolean) => void;
}

export const ModalContext = React.createContext<IContext | null>(null);

export const ModalProvider = ({ children }: IProvider) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const setInternalIsOpenModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  const setInternalIsDeleteModal = (value: boolean) => {
    setIsDeleteModal(value);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal: setInternalIsOpenModal,
        setIsDeleteModal: setInternalIsDeleteModal,
        isDeleteModal,
      }}
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
