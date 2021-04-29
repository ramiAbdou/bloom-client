import React from 'react';

import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import Modal from '@components/organisms/Modal/Modal';
import EventModalFormDeleteButton from './EventModalFormDeleteButton';
import EventModalFormDetailsSection from './EventModalFormDetailsSection';
import EventModalFormMainSection from './EventModalFormMainSection';
import EventModalFormNotificationsSection from './EventModalFormNotificationsSection';
import EventModalFormPrivacySection from './EventModalFormPrivacySection';
import useCreateEvent from './useCreateEvent';

const CreateEventModal: React.FC = () => {
  const createEvent: OnFormSubmitFunction = useCreateEvent();

  return (
    <Modal>
      <Form
        className="mx-auto w-10 w-100--mt"
        spacing="lg"
        onSubmit={createEvent}
      >
        <EventModalFormMainSection data={null} />
        <EventModalFormDetailsSection data={null} />
        <EventModalFormNotificationsSection />
        <EventModalFormPrivacySection data={null} />
        <FormSubmitButton loadingText="Creating...">
          Create Event
        </FormSubmitButton>
        <EventModalFormDeleteButton />
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
