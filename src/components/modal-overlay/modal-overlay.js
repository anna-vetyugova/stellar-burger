import modalOverlayStyles from "./modal-overlay.module.css";
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClose}></div> 
  );
};
ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}
export default ModalOverlay;