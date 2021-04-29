import React from 'react';

import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import EventModalFormDeleteButton from './EventModalFormDeleteButton';
import EventModalFormDetailsSection from './EventModalFormDetailsSection';
import EventModalFormMainSection from './EventModalFormMainSection';
import EventModalFormNotificationsSection from './EventModalFormNotificationsSection';
import EventModalFormPrivacySection from './EventModalFormPrivacySection';
import useCreateEvent from './useCreateEvent';

const EventModalCreateForm: React.FC = () => {
  const createEvent: OnFormSubmitFunction = useCreateEvent();

  return (
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
  );
};

export default EventModalCreateForm;
