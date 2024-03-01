
import React, { FC, type ReactNode, MouseEvent, PointerEvent } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useParams } from 'react-router-dom';

import { TModal } from "../../services/types/data";
const modalRoot = document.getElementById("react-modals") as HTMLElement;


const Modal: FC<TModal> = ({ 
  children, 
  header,
  closeModal
  }) => { 

  const modalRef = React.useRef<HTMLElement>(null);
  const { number } = useParams();

  React.useEffect(() => {
    const handleCloseOnEscape = (e: { key: string}) => {
        if (e.key === 'Escape') {
          closeModal();
        }
    }
    const handleCloseOnOverlay = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLDivElement)) {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleCloseOnEscape);
    document.addEventListener('click', handleCloseOnOverlay);
    return () => {
      document.removeEventListener('keydown', handleCloseOnEscape); 
      document.removeEventListener('click', handleCloseOnOverlay);  
    }
  }, [])

  const headerClass = header ? 'text text_type_main-large' : 'text text_type_digits-default';
  console.log(header);
  return ReactDOM.createPortal( 
    <>
      <section className={modalStyles.modal} ref={modalRef}>
        <div className={modalStyles.header}>
        <h3 className={headerClass}>{header ? header : number ? '#' + number : null}</h3> 
          <div className={modalStyles.closeIconContainer}>
            <CloseIcon type="primary" onClick={closeModal}/>
          </div> 
        </div>
        {children}
      </section>
      <ModalOverlay onClick={() => closeModal}/>
    </>,
    modalRoot
  );
};

export default Modal;
