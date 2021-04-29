import React from 'react';
import { communityIdVar, eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import FormLabel from '@components/organisms/Form/FormLabel';
import { useStory } from '@components/organisms/Story/Story.state';
import StoryPage from '@components/organisms/Story/StoryPage';
import useFindOne from '@gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ShowProps } from '@util/constants';
import { ICommunity, IEvent } from '@util/constants.entities';

const CheckInChoosePageActions: React.FC = () => {
  const [, storyDispatch] = useStory();
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const onPrimaryClick = () => {
    storyDispatch({
      branchId: 'FINISH_MEMBER',
      pageId: 'FINISH',
      type: 'SET_CURRENT_PAGE'
    });
  };

  const onSecondaryClick = () => {
    if (isUpcoming) {
      storyDispatch({
        branchId: 'FINISH_GUEST',
        pageId: 'FINISH',
        type: 'SET_CURRENT_PAGE'
      });

      return;
    }

    storyDispatch({
      branchId: 'FINISH_ATTENDEE',
      pageId: 'FINISH',
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

const CheckInChoosePage: React.FC<ShowProps> = ({ show }) => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  if (loading || show === false) return null;

  return (
    <StoryPage
      branches={{
        IS_MEMBER: {
          description:
            'This event records attendance, please check-in to continue.',
          title: 'Check In'
        }
      }}
    >
      <FormLabel
        marginBottom={16}
      >{`Are you a member of ${community.name}?`}</FormLabel>
      <CheckInChoosePageActions />
    </StoryPage>
  );
};

export default CheckInChoosePage;
