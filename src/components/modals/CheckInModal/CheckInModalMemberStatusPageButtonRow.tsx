import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { useStory } from '@components/organisms/Story/Story.state';
import useFindOne from '@gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@util/constants.entities';

const CheckInModalMemberStatusPageButtonRow: React.FC = () => {
  const [, storyDispatch] = useStory();
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

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

export default CheckInModalMemberStatusPageButtonRow;
