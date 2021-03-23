import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import { IMemberPlan, RecurrenceType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';
import { getPlanDescription } from './Payment.util';

const PaymentFinishPlanInformationCard: React.FC = () => {
  const planId: string = PaymentStore.useStoreState((state) => {
    return state.selectedPlanId;
  });

  const amount: number = useStoreState(({ db }) => {
    const plan: IMemberPlan = db.byMemberPlanId[planId];
    return plan.amount;
  });

  const name: string = useStoreState(({ db }) => {
    const plan: IMemberPlan = db.byMemberPlanId[planId];
    return plan.name;
  });

  const recurrence: RecurrenceType = useStoreState(({ db }) => {
    const plan: IMemberPlan = db.byMemberPlanId[planId];
    return plan.recurrence;
  });

  const description: string = getPlanDescription({ amount, recurrence });

  return <InformationCard description={description} title={name} />;
};

export default PaymentFinishPlanInformationCard;
