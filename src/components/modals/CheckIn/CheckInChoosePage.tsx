import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import FormStore from '@organisms/Form/Form.store';
import FormPage from '@organisms/Form/FormPage';
import { useStoreState } from '@store/Store';
import FormLabel from '../../organisms/Form/FormLabel';

const CheckInChoosePage: React.FC = () => {
  const name = useStoreState(({ db }) => {
    const { byId: byCommunityId } = db.entities.communities;
    return byCommunityId[db.event?.community]?.name;
  });

  const setPageId = FormStore.useStoreActions((store) => store.setPageId);

  const onPrimaryClick = () => setPageId('FINISH-YES');
  const onSecondaryClick = () => setPageId('FINISH-NO');

  return (
    <FormPage id="CHOOSE">
      <FormLabel marginBottom={16}>{`Are you a member of ${name}?`}</FormLabel>
      <Row equal>
        <Button primary onClick={onPrimaryClick}>
          Yes
        </Button>

        <Button secondary onClick={onSecondaryClick}>
          No
        </Button>
      </Row>
    </FormPage>
  );
};

export default CheckInChoosePage;
