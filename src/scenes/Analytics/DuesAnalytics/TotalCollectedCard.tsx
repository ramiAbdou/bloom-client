import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IPayment } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const totalCollected: number = useStoreState(({ db }) => {
    return db.community.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.filter((payment: IPayment) => {
        const yearAgoDate = day().subtract(1, 'year');
        return day(payment.createdAt).isAfter(yearAgoDate);
      })
      ?.reduce((acc: number, payment: IPayment) => {
        return acc + payment.amount;
      }, 0);
  });

  return (
    <GrayCard
      label="Total Dues Collected"
      show={totalCollected !== undefined}
      value={`$${totalCollected}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
