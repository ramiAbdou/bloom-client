import React from 'react';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.reactive';
import EventFormActions from './EventFormActions';
import EventFormDetailsSection from './EventFormDetailsSection';
import EventFormMainSection from './EventFormMainSection';
import EventFormNotificationsSection from './EventFormNotificationsSection';
import EventFormPrivacySection from './EventFormPrivacySection';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const EventForm: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const createEvent: OnFormSubmitFunction = useCreateEvent();
  const updateEvent: OnFormSubmitFunction = useUpdateEvent();
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
