import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import { ChildrenProps } from '@constants';

interface ConfirmationScreenProps extends ChildrenProps {
  title: string;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  children,
  title
}) => {
  return (
    <motion.div
      animate={{ x: 0 }}
      className="t-confirmation-screen"
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <IoCheckmarkCircle />
        <h1>{title}</h1>
      </div>

      {children}
    </motion.div>
  );
};

export default ConfirmationScreen;
