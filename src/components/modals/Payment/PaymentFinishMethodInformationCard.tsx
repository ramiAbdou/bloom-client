import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import { IMemberType, IPaymentMethod } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

const PaymentFinishMethodInformationCard: React.FC = () => {
  const selectedMemberTypeId: string = PaymentStore.useStoreState(
    (state) => state.selectedMemberTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const memberType: IMemberType = db.byMemberTypeId[selectedMemberTypeId];
    return memberType.isFree;
  });

  const brand: string = useStoreState(({ db }) => {
    const method: IPaymentMethod = db.memberIntegrations.paymentMethod;
    return method.brand;
  });

  const expirationDate: string = useStoreState(({ db }) => {
    const method: IPaymentMethod = db.memberIntegrations.paymentMethod;
    return method.expirationDate;
  });

  const last4: string = useStoreState(({ db }) => {
    const method: IPaymentMethod = db.memberIntegrations.paymentMethod;
    return method.last4;
  });

  return (
    <InformationCard
      description={`Expires ${expirationDate}`}
      show={!!last4 && !isFree}
      title={`${brand} Ending in ${last4}`}
    />
  );
};

export default PaymentFinishMethodInformationCard;
