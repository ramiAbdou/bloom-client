import { motion } from 'framer-motion';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

export interface ErrorMessageProps {
  marginBottom?: number;
  marginTop?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  marginBottom,
  marginTop
}) => {
  if (!children) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="c-misc-error"
      initial={{ opacity: 0 }}
      style={{ marginBottom, marginTop }}
      transition={{ duration: 0.2 }}
    >
      <IoAlertCircleOutline />
      <p>{children}</p>
    </motion.div>
  );
};

export default ErrorMessage;
