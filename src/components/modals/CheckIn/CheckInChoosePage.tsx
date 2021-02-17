import React from 'react';

import Button from '@atoms/Button/Button';
import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import FormLabel from '@organisms/Form/FormLabel';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';

const CheckInChoosePage: React.FC<ShowProps> = ({ show }) => {
  const name = useStoreState(({ db }) => {
    return db.byCommunityId[db.event?.community]?.name;
  });

  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  if (show === false) return null;

  const onPrimaryClick = () => {
    setCurrentPage({ branchId: 'FINISH_MEMBER', id: 'FINISH' });
  };

  const onSecondaryClick = () => {
    setCurrentPage({ branchId: 'FINISH_GUEST', id: 'FINISH' });
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
