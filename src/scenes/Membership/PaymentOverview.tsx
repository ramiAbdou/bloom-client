import day from 'dayjs';
import { nanoid } from 'nanoid';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { MainSection } from '@containers/Main';
import RowContainer from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import { Column, Row, TableOptions } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMemberPayment } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import {
  GET_MEMBER_PAYMENTS,
  GET_UPCOMING_PAYMENT,
  GetUpcomingPaymentResult
} from './Membership.gql';

const PaymentNextDueCard: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);

  const { data, loading } = useQuery<GetUpcomingPaymentResult>({
    name: 'getUpcomingPayment',
    query: GET_UPCOMING_PAYMENT
  });

  const { amount, nextPaymentDate } = data ?? {};

  if (loading || !amount) return null;

  return (
    <Card
      className="s-membership-card s-membership-card--next"
      loading={loading}
    >
      <h4>{autoRenew ? 'Next Scheduled Payment' : 'Next Payment Due'}</h4>

      <RowContainer spaceBetween>
        <p>{day(nextPaymentDate).format('MMMM D, YYYY')}</p>
        <p>${amount.toFixed(2)}</p>
      </RowContainer>
    </Card>
  );
};

const PaymentHistoryTable: React.FC = () => {
  const rows: Row[] = useStoreState(({ db }) => {
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byTypeId } = db.entities.types;

    return db.member.payments?.map((paymentId: string) => {
      const {
        amount,
        createdAt,
        stripeInvoiceUrl,
        type
      }: IMemberPayment = byPaymentId[paymentId];

      const typeName = byTypeId[type].name;

      return {
        Amount: `$${(amount / 100).toFixed(2)}`,
        Date: day(createdAt).format('MMMM DD, YYYY'),
        'Membership Plan': typeName,
        Receipt: (
          <Button tertiary href={stripeInvoiceUrl}>
            Receipt
          </Button>
        ),
        id: nanoid()
      };
    });
  });

  const columns: Column[] = [
    { id: 'Date', title: 'Date', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'Membership Plan',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
    { hide: true, id: 'Receipt', title: 'Receipt', type: 'CUSTOM' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false,
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent emptyMessage="Looks like you haven't made any payments." />
    </Table>
  );
};

const PaymentOverview: React.FC = () => {
  const { loading } = useQuery<IMemberPayment[]>({
    name: 'getMemberPayments',
    query: GET_MEMBER_PAYMENTS,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection
      className="s-membership-overview-ctr"
      loading={loading}
      title="Payment Overview"
    >
      <PaymentNextDueCard />
      <PaymentHistoryTable />
    </MainSection>
  );
};

export default PaymentOverview;
