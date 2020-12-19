import { motion } from 'framer-motion';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { MessageProps } from '@constants';

export interface ErrorMessageProps extends MessageProps {
  marginBottom?: number;
  marginTop?: number;
}

export default ({ marginBottom, marginTop, message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="c-misc-error"
      initial={{ opacity: 0 }}
      style={{ marginBottom, marginTop }}
      transition={{ duration: 0.2 }}
    >
      <IoAlertCircleOutline />
      <p>{message}</p>
    </motion.div>
  );
};
