import { motion } from 'framer-motion';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { ChildrenProps } from '@constants';

export interface WarningMessageProps extends ChildrenProps {
  marginBottom?: number;
  marginTop?: number;
}

const WarningMessage: React.FC<WarningMessageProps> = ({
  children,
  marginBottom,
  marginTop
}) => {
  if (!children) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="c-misc-warning"
      initial={{ opacity: 0 }}
      style={{ marginBottom, marginTop }}
      transition={{ duration: 0.2 }}
    >
      <IoAlertCircleOutline />
      <p>{children}</p>
    </motion.div>
  );
};

export default WarningMessage;
