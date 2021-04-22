import React from 'react';
import { communityIdVar, eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import FormLabel from '@components/organisms/Form/FormLabel';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import { ICommunity, IEvent } from '@util/constants.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ShowProps } from '@util/constants';

const CheckInChoosePageActions: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const onPrimaryClick = () => {
    setCurrentPage({ branchId: 'FINISH_MEMBER', id: 'FINISH' });
  };

  const onSecondaryClick = () => {
    if (isUpcoming) setCurrentPage({ branchId: 'FINISH_GUEST', id: 'FINISH' });
    else setCurrentPage({ branchId: 'FINISH_ATTENDEE', id: 'FINISH' });
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
