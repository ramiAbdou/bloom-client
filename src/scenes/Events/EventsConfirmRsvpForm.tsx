import React from 'react';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { IEvent, IEventGuest } from '@util/constants.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';

const EventsConfirmRsvpFormHeader: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { loading, data: event } = useFindOne(IEvent, {
    fields: ['title'],
    where: { id: eventId }
  });

  if (loading) return null;

  const title: string = `Confirm RSVP to ${event.title}`;

  const description: string =
    'You will receive a confirmation email and a reminder email 1 day and 1 hour before the event starts.';

  return <FormHeader description={description} title={title} />;
};

const EventsConfirmRsvpForm: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const onSubmit: OnFormSubmitFunction = async ({
    closeModal,
    // db,
    gql,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await gql.create(IEventGuest, {
      data: { eventId, memberId: '' },
      fields: [
        'createdAt',
        'event.id',
        'member.firstName',
        'member.id',
        'member.lastName',
        'member.pictureUrl'
      ],
      modifications: [{ entity: IEvent, field: 'eventGuests', id: eventId }]
    });

    if (error) {
      setError('Failed to register RSVP.');
      return;
    }

    closeModal();
    showToast({ message: 'RSVP was registered.' });
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <EventsConfirmRsvpFormHeader />
      <ModalConfirmationActions
        primaryLoadingText="Confirming..."
        primaryText="Confirm"
      />
    </Form>
  );
};

export default EventsConfirmRsvpForm;
