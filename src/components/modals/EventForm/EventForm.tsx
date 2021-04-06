import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import { useStoreState } from '@store/Store';
import EventFormActions from './EventFormActions';
import EventFormDetailsSection from './EventFormDetailsSection';
import EventFormMainSection from './EventFormMainSection';
import EventFormNotificationsSection from './EventFormNotificationsSection';
import EventFormPrivacySection from './EventFormPrivacySection';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const EventForm: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(eventId);
  const onSubmit: OnFormSubmitFunction = eventId ? updateEvent : createEvent;

  return (
    <Form className="mx-auto w-10 w-100--mt" spacing="lg" onSubmit={onSubmit}>
      <EventFormMainSection />
      <EventFormDetailsSection />
      <EventFormNotificationsSection />
      <EventFormPrivacySection />
      <EventFormActions />
    </Form>
  );
};

export default EventForm;
