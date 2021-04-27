import React from 'react';
import { showToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { modalVar } from '@core/state/Modal.reactive';
import useFindOne from '@gql/hooks/useFindOne';
import { IEvent, IEventGuest } from '@util/constants.entities';

const EventsConfirmRsvpModalHeader: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

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

const EventsConfirmRsvpModal: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onSubmit: OnFormSubmitFunction = async ({
    gql,
    setError
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

    modalVar(null);
    showToast({ message: 'RSVP was registered.' });
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <EventsConfirmRsvpModalHeader />
      <ModalConfirmationActions
        primaryLoadingText="Confirming..."
        primaryText="Confirm"
      />
    </Form>
  );
};

export default EventsConfirmRsvpModal;