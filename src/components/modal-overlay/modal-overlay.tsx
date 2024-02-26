import modalOverlayStyles from "./modal-overlay.module.css";
import React, { useRef, useEffect, FC } from "react";
import PropTypes from "prop-types";

// const ModalOverlay = ({onClose}) => {
const ModalOverlay: FC = ({onClose}) => {    
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClose}></div> 
  );
};
// ModalOverlay.propTypes = {
//   onClose: PropTypes.func,
// }
export default ModalOverlay;