import { useState, useCallback } from "react";

export const useModal = () => {
  const [modalState, toggleModal] = useState(false);

  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
  };
};