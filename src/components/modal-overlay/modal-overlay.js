import modalOverlayStyles from "./modal-overlay.module.css";
import React, { useRef, useEffect } from "react";

const ModalOverlay = ({onClose}) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClose}></div> 
  );
};
export default ModalOverlay;