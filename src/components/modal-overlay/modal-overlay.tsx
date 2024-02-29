import modalOverlayStyles from "./modal-overlay.module.css";
import React, { useRef, useEffect, FC, type ReactNode } from "react";
import PropTypes from "prop-types";

import { TModalOverlay } from "../../services/types/data"; 

const ModalOverlay: FC<TModalOverlay>  = ({ children, onClick}) => {    
  return (
    <div className={modalOverlayStyles.overlay} onClick={() => onClick}></div> 
  );
};

export default ModalOverlay;