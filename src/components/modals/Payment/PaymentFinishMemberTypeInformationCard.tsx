import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import { IMemberType, RecurrenceType } from '@store/db/Db.entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';
import { getMemberTypeDescription } from './Payment.util';

const PaymentFinishMemberTypeInformationCard: React.FC = () => {
  const selectedMemberTypeId: string = PaymentStore.useStoreState(
    (state) => state.selectedMemberTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const memberType: IMemberType = db.byMemberTypeId[selectedMemberTypeId];
    return memberType.amount;
  });

  const name: string = useStoreState(({ db }) => {
    const memberType: IMemberType = db.byMemberTypeId[selectedMemberTypeId];
    return memberType.name;
  });

  const recurrence: RecurrenceType = useStoreState(({ db }) => {
    const memberType: IMemberType = db.byMemberTypeId[selectedMemberTypeId];
    return memberType.recurrence;
  });

  const description: string = getMemberTypeDescription({ amount, recurrence });

  return <InformationCard description={description} title={name} />;
};

export default PaymentFinishMemberTypeInformationCard;
