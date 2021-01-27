import deline from 'deline';
import React from 'react';

import { IdProps, ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import { FormNavigationPageProps } from '@organisms/Form/Form.types';
import FormNavigation from '@organisms/Form/FormNavigation';
import Modal from '@organisms/Modal/Modal';
import { ModalProps } from '@organisms/Modal/Modal.types';
import { takeFirst } from '@util/util';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInFinishPage from './CheckInFinishPage';

interface CheckInModal extends IdProps, Pick<ModalProps, 'lock'> {}

const CheckInModal: React.FC<CheckInModal> = ({ id: eventId, lock }) => {
  const pages: FormNavigationPageProps[] = [
    ...(!lock
      ? [
          {
            description: deline`
              This event records attendance, please check-in to continue.
            `,
            id: 'CHOOSE',
            title: 'Check In'
          }
        ]
      : []),
    {
      aliases: ['FINISH-YES', 'FINISH-NO'],
      description: takeFirst([
        [
          lock,
          deline`
            You need to be a member to view this event. Sign in to continue.
          `
        ],
        [true, `Login with Google to finish checking-in.`]
      ]),
      id: 'FINISH-YES',
      title: lock ? 'Sign In to Continue' : 'Check In'
    }
  ];

  return (
    <Modal id={`${ModalType.CHECK_IN}-${eventId}`} lock={lock}>
      <Form options={{ multiPage: true }} pages={pages}>
        <FormNavigation />
        <CheckInChoosePage />
        <CheckInFinishPage />
      </Form>
    </Modal>
  );
};

export default CheckInModal;
