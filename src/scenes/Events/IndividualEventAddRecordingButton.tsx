import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { showPanel } from '@components/organisms/Panel/Panel.state';
import { PanelType } from '@components/organisms/Panel/Panel.types';
import useMemberRole from '@core/hooks/useMemberRole';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

const IndividualEventAddRecordingButton: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const role: MemberRole = useMemberRole();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!role || !isPast) return null;

  const onClick = (): void => {
    showPanel({
      align: 'BOTTOM_LEFT',
      id: PanelType.ADD_RECORDING_LINK,
      metadata: event.id,
      size: 'lg'
    });
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
