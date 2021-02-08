import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import ModalStore from '@organisms/Modal/Modal.store';
import { IPaymentMethod } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const MembershipPaymentMethodEmpty: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(
    ({ db }) => !!db.member.paymentMethod
  );

  const showModal = ModalStore.useStoreActions((store) => store.showModal);
  const onClick = () => showModal({ id: ModalType.UPDATE_PAYMENT_METHOD });

  return (
    <Show show={!isCardOnFile}>
      <p>No payment method added.</p>

      <Button fill secondary onClick={onClick}>
        Add Payment Method
      </Button>
    </Show>
  );
};

const MembershipPaymentMethodContent: React.FC = () => {
  const { brand, expirationDate, last4 }: IPaymentMethod = useStoreState(
    ({ db }) => db.member.paymentMethod ?? {},
    deepequal
  );

  const showModal = ModalStore.useStoreActions((store) => store.showModal);
  const onClick = () => showModal({ id: ModalType.UPDATE_PAYMENT_METHOD });

  return (
    <Show show={!!last4}>
      <p>
        {brand} ending in {last4}
      </p>

      <p>Expires: {expirationDate}</p>

      <Button fill secondary onClick={onClick}>
        Update Payment Method
      </Button>
    </Show>
  );
};

const MembershipPaymentMethod: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  const isLifetime: boolean = useStoreState(({ db }) => {
    return db.byTypeId[db.member?.type]?.recurrence === 'LIFETIME';
  });

  return (
    <Card
      className="s-membership-card s-membership-card--payment"
      show={!isDuesActive || !isLifetime}
      title="Payment Method"
    >
      <MembershipPaymentMethodContent />
      <MembershipPaymentMethodEmpty />
    </Card>
  );
};

export default MembershipPaymentMethod;
