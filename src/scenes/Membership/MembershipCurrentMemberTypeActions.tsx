import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { PaymentModalType } from '@modals/Payment/Payment.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';

const MembershipCurrentMemberTypeActions: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  const currentTypeId: string = useStoreState(
    ({ db }) => db.member?.memberType
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const { url } = useRouteMatch();
  const { push } = useHistory();

  const onPrimaryClick = () => {
    showModal({
      id: ModalType.PAY_DUES,
      metadata: {
        selectedMemberTypeId: currentTypeId,
        type: PaymentModalType.PAY_DUES
      }
    });
  };

  const onSecondaryClick = () => push(`${url}/change`);

  return (
    <Row equal={!isDuesActive} spacing="xs">
      <Button primary show={!isDuesActive} onClick={onPrimaryClick}>
        Pay Dues
      </Button>

      <Button fill secondary onClick={onSecondaryClick}>
        Change Type
      </Button>
    </Row>
  );
};

export default MembershipCurrentMemberTypeActions;
