import React from 'react';
import { itemVariants2 } from '~/constants/motion';
import { cn } from '~/utils';
import { motion } from 'framer-motion';
import { RiCloseCircleFill } from 'react-icons/ri';

// status: 'none' | 'error' | 'success'
const ValidateField = ({ status = 'none', content }) => {
  return (
    <motion.div
      key="req-box-cpass-1"
      variants={itemVariants2}
      className={cn(
        'require-box',
        status === 'error' && 'error-status',
        status === 'success' && 'success-status'
      )}
    >
      <div className="require-box-title">{content}</div>
      <RiCloseCircleFill className="require-icon" />
    </motion.div>
  );
};

export default ValidateField;
