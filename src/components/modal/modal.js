
import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, closeModal }) => {
  const modalRef = React.useRef();
  React.useEffect(() => {
    const handleCloseOnEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
    }
    const handleCloseOnOverlay = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
  }
    document.addEventListener('keydown', handleCloseOnEscape);
    document.addEventListener('click', handleCloseOnOverlay);
    return () => {
      document.removeEventListener("keydown", handleCloseOnEscape); 
      document.removeEventListener('click', handleCloseOnOverlay);  
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <section className={modalStyles.modal} ref={modalRef}>
        <div className={modalStyles.header}>
          <h3 className="text text_type_main-large">{header}</h3>
          <div className={modalStyles.closeIconContainer}>
            <CloseIcon type="primary" onClick={closeModal}/>
          </div>
        </div>
        {children}
      </section>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
}
export default Modal;
