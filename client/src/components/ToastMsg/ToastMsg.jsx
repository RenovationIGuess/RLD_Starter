import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import './ToastMsg.scss';

const ErrorToastMsg = (props) => {
  return (
    <motion.div
      variants={props.variants}
      style={props.style}
      className={`toast`}
    >
      <div className="toast__content">
        <GrFormClose className="toast__icon" />
        <div className="toast__message">
          <span className="toast__text">{props.description}</span>
        </div>
      </div>
      <GrFormClose className="toast__close" />
      <div className="toast__progress"></div>
    </motion.div>
  );
};

export default ErrorToastMsg;
