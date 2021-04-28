import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import useMemberRole from '@core/hooks/useMemberRole';
import { useStoreActions } from '@core/store/Store';
import { ComponentWithFragments, PanelType } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

const IndividualEventAddRecordingButton: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  const role: MemberRole = useMemberRole();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!role || !isPast) return null;

  const onClick = (): void => {
    showPanel({ id: PanelType.ADD_RECORDING_LINK, metadata: event.id });
  };

  return (
    <Button
      fill
      large
      secondary
      id={PanelType.ADD_RECORDING_LINK}
      onClick={onClick}
    >
      {event.recordingUrl ? 'Edit Event Recording' : '+ Add Event Recording'}
    </Button>
  );
};

IndividualEventAddRecordingButton.fragment = gql`
  fragment IndividualEventAddRecordingButtonFragment on events {
    endTime
    id
    recordingUrl
    startTime
  }
`;

export default IndividualEventAddRecordingButton;
