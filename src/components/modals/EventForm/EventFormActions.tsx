import React from 'react';

import { useReactiveVar } from '@apollo/client';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { modalVar } from '@core/state/Modal.reactive';
import EventFormDeleteButton from './EventFormDeleteButton';

const EventFormActions: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  return (
    <>
      <FormSubmitButton loadingText={eventId ? 'Updating...' : 'Creating...'}>
        {eventId ? 'Update Event' : 'Create Event'}
      </FormSubmitButton>

      <EventFormDeleteButton />
    </>
  );
};

export default EventFormActions;
