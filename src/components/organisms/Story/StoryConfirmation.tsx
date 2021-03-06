import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import { ShowProps } from '@util/constants';

interface StoryConfirmationProps {
  closeButton?: boolean;
  title: string;
}

const StoryConfirmationCloseButton: React.FC<ShowProps> = ({ show }) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClose = () => closeModal();

  return (
    <Button
      fill
      large
      secondary
      show={show}
      style={{ marginTop: 24 }}
      onClick={onClose}
    >
      Close
    </Button>
  );
};

const StoryConfirmation: React.FC<StoryConfirmationProps> = ({
  closeButton,
  children,
  title
}) => (
  <motion.div
    animate={{ x: 0 }}
    className="o-story-confirmation"
    initial={{ x: 50 }}
    transition={{ duration: 0.2 }}
  >
    <div>
      <IoCheckmarkCircle />
      <h1>{title}</h1>
    </div>

    {children}

    <StoryConfirmationCloseButton show={!!closeButton} />
  </motion.div>
);

export default StoryConfirmation;
