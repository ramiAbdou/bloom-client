import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import { IMemberPlan, IPaymentMethod } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

const PaymentFinishMethodInformationCard: React.FC = () => {
  const planId: string = PaymentStore.useStoreState((state) => {
    return state.selectedPlanId;
  });

  const isFree: boolean = useStoreState(({ db }) => {
    const plan: IMemberPlan = db.byMemberPlanId[planId];
    return plan.isFree;
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
