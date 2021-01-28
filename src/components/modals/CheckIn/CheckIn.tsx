import React from 'react';

import { IdProps, ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import { ModalProps } from '@organisms/Modal/Modal.types';
import Story from '@organisms/Story/Story';
import StoryConfirmationPage from '@organisms/Story/StoryConfirmationPage';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInFinishPage from './CheckInFinishPage';

interface CheckInModal extends IdProps, Pick<ModalProps, 'lock'> {}

const CheckInModal: React.FC<CheckInModal> = ({ id: eventId, lock }) => {
  return (
    <Modal id={`${ModalType.CHECK_IN}-${eventId}`} lock={lock}>
      <Story>
        <CheckInChoosePage show={!lock} />
        <CheckInFinishPage />
        <StoryConfirmationPage />
      </Story>
    </Modal>
  );
};

export default CheckInModal;
