
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, closeModal, header }) => {
  const modalRef = React.useRef();

  const closeOnOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  const closeOnEscape = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOverlayClick);
      document.removeEventListener("keydown", closeOnEscape);  
    }
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal} ref={modalRef}>
        <div className={modalStyles.content}>
          <div className={modalStyles.header}>
            <h3 className="text text_type_main-large">{header}</h3>
            <CloseIcon type="primary" onClick={closeModal}/>

          </div>
        </div> 
      </div>
      {children}
      <ModalOverlay onClick={closeModal} />
    </>,
    modalRoot
  );
};
export default Modal;
