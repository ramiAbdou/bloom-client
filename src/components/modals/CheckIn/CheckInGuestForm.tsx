import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IEvent } from '@util/constants.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { QuestionCategory, ShowProps } from '@util/constants';
import useCreateEventAttendeeWithSupporter from './useCreateEventAttendeeWithSupporter';
import useCreateEventGuestWithSupporter from './useCreateEventGuestWithSupporter';

const CheckInGuestFormContent: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  return (
    <>
      <Row equal align="baseline" spacing="xs">
        <FormShortText
          category={QuestionCategory.FIRST_NAME}
          title="First Name"
        />

        <FormShortText
          category={QuestionCategory.LAST_NAME}
          title="Last Name"
        />
      </Row>

      <FormShortText category={QuestionCategory.EMAIL} title="Email" />
      <FormSubmitButton>{isUpcoming ? 'RSVP' : 'Join'}</FormSubmitButton>
    </>
  );
};

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const createEventGuestWithSupporter = useCreateEventGuestWithSupporter();
  const createEventAttendeeWithSupporter = useCreateEventAttendeeWithSupporter();

  if (loading || show === false) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const onSubmit: OnFormSubmitFunction = isUpcoming
    ? createEventGuestWithSupporter
    : createEventAttendeeWithSupporter;

  return (
    <Form onSubmit={onSubmit}>
      <CheckInGuestFormContent />
    </Form>
  );
};

export default CheckInGuestForm;
