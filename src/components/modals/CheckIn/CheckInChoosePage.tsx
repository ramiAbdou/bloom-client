import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { ICommunity, IEvent } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import FormLabel from '@components/organisms/Form/FormLabel';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';
import { ShowProps } from '@util/constants';

const CheckInChoosePageActions: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

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
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { name } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  if (show === false) return null;

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
      <FormLabel marginBottom={16}>{`Are you a member of ${name}?`}</FormLabel>
      <CheckInChoosePageActions />
    </StoryPage>
  );
};

export default CheckInChoosePage;
