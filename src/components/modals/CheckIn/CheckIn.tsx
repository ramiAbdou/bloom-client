import React from 'react';

import { IdProps, ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import { ModalProps } from '@organisms/Modal/Modal.types';
import Story from '@organisms/Story/Story';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInFinishPage from './CheckInFinishPage';

interface CheckInModal extends IdProps, Pick<ModalProps, 'lock'> {}

const CheckInModal: React.FC<CheckInModal> = ({ id: eventId, lock }) => {
  return (
    <Modal id={`${ModalType.CHECK_IN}-${eventId}`} lock={lock}>
      <Story>
        <CheckInChoosePage show={!lock} />
        <CheckInFinishPage lock={lock} />
        <CheckInConfirmation />
      </Story>
    </Modal>
  );
};

export default CheckInModal;
