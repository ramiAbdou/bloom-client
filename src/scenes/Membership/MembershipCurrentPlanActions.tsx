import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import { useStoreActions, useStoreState } from '@store/Store';

const MembershipCurrentPlanActions: React.FC = () => {
  const isDuesActive: boolean =
    useStoreState(({ db }) => db.member?.duesStatus) === 'Active';

  const isLifetime: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[db.member?.type].recurrence === 'LIFETIME';
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { url } = useRouteMatch();
  const { push } = useHistory();

  if (isDuesActive && isLifetime) return null;

  const onPrimaryClick = () => showModal(ModalType.PAY_DUES);
  const onSecondaryClick = () => push(`${url}/change`);

  return (
    <Row equal={!isDuesActive}>
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
