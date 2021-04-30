import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { useStory } from '@components/organisms/Story/Story.state';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const CheckInModalMemberStatusPageButtonRow: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const [, storyDispatch] = useStory();

  const isUpcoming: boolean =
    getEventTiming({ endTime: event.endTime, startTime: event.startTime }) ===
    EventTiming.UPCOMING;

  const onPrimaryClick = (): void => {
    storyDispatch({
      branchId: 'FINISH_MEMBER',
      pageId: 'CHECK_IN_MAIN',
      type: 'SET_CURRENT_PAGE'
    });
  };

  const onSecondaryClick = (): void => {
    if (isUpcoming) {
      storyDispatch({
        branchId: 'FINISH_GUEST',
        pageId: 'CHECK_IN_MAIN',
        type: 'SET_CURRENT_PAGE'
      });

      return;
    }

    storyDispatch({
      branchId: 'FINISH_ATTENDEE',
      pageId: 'CHECK_IN_MAIN',
      type: 'SET_CURRENT_PAGE'
    });
  };

  return (
    <Row equal spacing="xs">
      <Button primary onClick={onPrimaryClick}>
        Yes
      </Button>

      <Button secondary onClick={onSecondaryClick}>
        No
      </Button>
    </Row>
  );
};

CheckInModalMemberStatusPageButtonRow.fragment = gql`
  fragment CheckInModalMemberStatusPageButtonRowFragment on events {
    endTime
    startTime
  }
`;

export default CheckInModalMemberStatusPageButtonRow;
