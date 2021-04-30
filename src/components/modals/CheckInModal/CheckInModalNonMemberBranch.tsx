import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import {
  ComponentWithData,
  ComponentWithFragments,
  QuestionCategory,
  ShowProps
} from '@util/constants';
import { IEvent } from '@util/constants.entities';
import useCreateEventAttendeeWithSupporter from './useCreateEventAttendeeWithSupporter';
import useCreateEventGuestWithSupporter from './useCreateEventGuestWithSupporter';

const CheckInModalNonMemberFormContent: ComponentWithData<IEvent> = ({
  data: event
}) => {
  const isUpcoming: boolean =
    getEventTiming({ endTime: event.endTime, startTime: event.startTime }) ===
    EventTiming.UPCOMING;

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

const CheckInModalNonMemberBranch: ComponentWithFragments<
  IEvent,
  ShowProps
> = ({ data: event, show }) => {
  const createEventGuestWithSupporter = useCreateEventGuestWithSupporter();
  const createEventAttendeeWithSupporter = useCreateEventAttendeeWithSupporter();

  if (show === false) return null;

  const isUpcoming: boolean =
    getEventTiming({ endTime: event.endTime, startTime: event.startTime }) ===
    EventTiming.UPCOMING;

  const onSubmit: OnFormSubmitFunction = isUpcoming
    ? createEventGuestWithSupporter
    : createEventAttendeeWithSupporter;

  return (
    <Form onSubmit={onSubmit}>
      <CheckInModalNonMemberFormContent data={event} />
    </Form>
  );
};

CheckInModalNonMemberBranch.fragment = gql`
  fragment CheckInModalNonMemberBranchFragment on events {
    endTime
    startTime
  }
`;

export default CheckInModalNonMemberBranch;
