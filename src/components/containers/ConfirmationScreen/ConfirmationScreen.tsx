import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ChildrenProps } from '@constants';

interface ConfirmationScreenProps extends ChildrenProps {
  closeButton?: boolean;
  onClose?: VoidFunction;
  title: string;
}

const ConfirmationScreenCloseButton: React.FC<
  Pick<ConfirmationScreenProps, 'closeButton' | 'onClose'>
> = ({ closeButton, onClose }) => {
  if (!closeButton) return null;

  return (
    <Button fill large secondary onClick={onClose}>
      Close
    </Button>
  );
};

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  closeButton,
  children,
  onClose,
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

      <ConfirmationScreenCloseButton
        closeButton={closeButton}
        onClose={onClose}
      />
    </motion.div>
  );
};

export default ConfirmationScreen;
