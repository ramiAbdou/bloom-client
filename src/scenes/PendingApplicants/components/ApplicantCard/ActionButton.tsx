/**
 * @fileoverview Scene: ActionButton
 * @author Rami Abdou
 */

import React from 'react';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoMdArrowBack
} from 'react-icons/io';

import Button from '@components/Button/Button';
import { useStoreActions } from '@store/Store';

// In the context of the ExpandedCard, which exits the modal.
export const BackButton = () => {
  const closeFlow = useStoreActions(({ flow }) => flow.closeFlow);
  return (
    <Button onClick={() => closeFlow()}>
      <IoMdArrowBack className="back-arrow" style={{ height: 32, width: 32 }} />
    </Button>
  );
};

export const AcceptButton = () => {
  return (
    <Button className="s-applicants-card-action" value="Accept">
      <IoIosCheckmarkCircle />
    </Button>
  );
};

export const IgnoreButton = () => {
  return (
    <Button className="s-applicants-card-action" value="Ignore">
      <IoIosCloseCircle />
    </Button>
  );
};
