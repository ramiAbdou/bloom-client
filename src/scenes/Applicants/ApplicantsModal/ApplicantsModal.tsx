import React from 'react';

import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import ExpandedCard from './ExpandedCard';

const ApplicantsModal: React.FC<IdProps> = ({ id }) => {
  return (
    <Modal id={id}>
      <ExpandedCard />
    </Modal>
  );
};

export default ApplicantsModal;
