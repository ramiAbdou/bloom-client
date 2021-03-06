import React from 'react';

import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import EventFormDeleteButton from './EventFormDeleteButton';

const EventFormActions: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

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
