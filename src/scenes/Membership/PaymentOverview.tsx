import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button';
import { MainSection } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import { Column, Row, TableOptions } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMemberPayment } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { uuid } from '@util/util';
import { GET_PAYMENT_HISTORY } from './Membership.gql';

const PaymentHistoryTable: React.FC = () => {
  const rows: Row[] = useStoreState(({ db }) => {
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byTypeId } = db.entities.types;

    console.log(db.member.payments);

    return db.member.payments?.map((paymentId: string) => {
      const {
        amount,
        createdAt,
        stripeInvoiceUrl,
        type
      }: IMemberPayment = byPaymentId[paymentId];

      const typeName = byTypeId[type].name;

      return {
        Amount: `$${amount / 100}.00`,
        Date: day(createdAt).format('MMMM DD, YYYY'),
        'Membership Plan': typeName,
        Receipt: (
          <Button tertiary href={stripeInvoiceUrl}>
            Receipt
          </Button>
        ),
        id: uuid()
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
    name: 'getPaymentHistory',
    query: GET_PAYMENT_HISTORY,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection
      className="s-membership-history-ctr"
      loading={loading}
      title="Payment Overview"
    >
      <PaymentHistoryTable />
    </MainSection>
  );
};

export default PaymentOverview;
