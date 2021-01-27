import deline from 'deline';
import React from 'react';

import { IdProps, ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import { FormNavigationPageProps } from '@organisms/Form/Form.types';
import FormNavigation from '@organisms/Form/FormNavigation';
import Modal from '@organisms/Modal/Modal';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInFinishPage from './CheckInFinishPage';

const CheckInModal: React.FC<IdProps> = ({ id: eventId }) => {
  const pages: FormNavigationPageProps[] = [
    {
      description: deline`
        This event records attendance, please check-in to continue.
      `,
      id: 'CHOOSE',
      title: 'Check In'
    },
    {
      aliases: ['FINISH-YES', 'FINISH-NO'],
      description: `Login with Google to finish checking-in.`,
      title: 'Check In'
    }
  ];

  return (
    <Modal id={`${ModalType.CHECK_IN}-${eventId}`}>
      <Form options={{ multiPage: true }} pages={pages}>
        <FormNavigation />
        <CheckInChoosePage />
        <CheckInFinishPage />
      </Form>
    </Modal>
  );
};

export default CheckInModal;
