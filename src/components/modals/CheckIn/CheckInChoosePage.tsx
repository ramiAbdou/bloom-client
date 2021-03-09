import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import FormLabel from '@organisms/Form/FormLabel';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { ICommunity } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { ShowProps } from '@util/constants';

const CheckInChoosePage: React.FC<ShowProps> = ({ show }) => {
  const name: string = useStoreState(({ db }) => {
    const community: ICommunity = db.byCommunityId[db.event?.community];
    return community?.name;
  });

  const isBefore: boolean = useStoreState(({ db }) => {
    return day().isBefore(day(db.event?.startTime).subtract(30, 'm'));
  });

  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

  if (show === false) return null;

  const onPrimaryClick = () => {
    setCurrentPage({ branchId: 'FINISH_MEMBER', id: 'FINISH' });
  };

  const onSecondaryClick = () => {
    if (isBefore) setCurrentPage({ branchId: 'FINISH_GUEST', id: 'FINISH' });
    else setCurrentPage({ branchId: 'FINISH_ATTENDEE', id: 'FINISH' });
  };

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
      <Row equal spacing="xs">
        <Button primary onClick={onPrimaryClick}>
          Yes
        </Button>

        <Button secondary onClick={onSecondaryClick}>
          No
        </Button>
      </Row>
    </StoryPage>
  );
};

export default CheckInChoosePage;
