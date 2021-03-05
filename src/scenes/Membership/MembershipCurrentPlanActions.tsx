import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { RecurrenceType } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';

const MembershipCurrentPlanActions: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  const isLifetime: boolean = useStoreState(({ db }) => {
    return (
      db.byMemberPlanId[db.member?.plan]?.recurrence === RecurrenceType.LIFETIME
    );
  });

  const currentTypeId: string = useStoreState(({ db }) => {
    return db.member?.plan;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { url } = useRouteMatch();
  const { push } = useHistory();

  if (isDuesActive && isLifetime) return null;

  const onPrimaryClick = () => {
    showModal({
      id: ModalType.PAY_DUES,
      metadata: { selectedTypeId: currentTypeId, type: 'PAY_DUES' }
    });
  };

  const onSecondaryClick = () => push(`${url}/change`);

  return (
    <Row equal={!isDuesActive} spacing="xs">
      <Button primary show={!isDuesActive} onClick={onPrimaryClick}>
        Pay Dues
      </Button>

      <Button fill secondary onClick={onSecondaryClick}>
        Change Plan
      </Button>
    </Row>
  );
};

export default MembershipCurrentPlanActions;
