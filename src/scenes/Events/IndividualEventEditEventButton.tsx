import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import useMemberRole from '@core/hooks/useMemberRole';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

const IndividualEventEditEventButton: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const role: MemberRole = useMemberRole();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!role || isPast) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.UPDATE_EVENT, metadata: event.id });
  };

  return (
    <Button fill large secondary onClick={onClick}>
      Edit Event
    </Button>
  );
};

IndividualEventEditEventButton.fragment = gql`
  fragment IndividualEventEditEventButtonFragment on events {
    endTime
    id
    startTime
  }
`;

export default IndividualEventEditEventButton;
