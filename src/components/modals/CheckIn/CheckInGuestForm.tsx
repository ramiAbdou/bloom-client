import React from 'react';

import Row from '@containers/Row/Row';
import { IEvent } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';
import { QuestionCategory, ShowProps } from '@util/constants';
import useCreateEventAttendeeWithSupporter from './useCreateEventAttendeeWithSupporter';
import useCreateEventGuestWithSupporter from './useCreateEventGuestWithSupporter';

const CheckInGuestFormContent: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

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
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const createEventGuestWithSupporter = useCreateEventGuestWithSupporter();
  const createEventAttendeeWithSupporter = useCreateEventAttendeeWithSupporter();

  if (show === false) return null;

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
