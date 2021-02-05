import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMemberPayment, IMemberType } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { GET_MEMBER_PAYMENTS, GET_UPCOMING_PAYMENT } from './Membership.gql';
import MembershipPaymentScheduledCard from './MembershipPaymentScheduledCard';

const MembershipPaymentTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byTypeId } = db.entities.types;

    return db.member.payments
      ?.map((paymentId: string) => byPaymentId[paymentId])
      ?.filter((payment: IMemberPayment) => !!payment?.type)
      ?.map((payment: IMemberPayment) => {
        const { amount, createdAt, id, stripeInvoiceUrl } = payment;
        const type: IMemberType = byTypeId[payment.type];

        return {
          amount: `$${(amount / 100).toFixed(2)}`,
          date: day(createdAt).format('MMM DD, YYYY'),
          id,
          receipt: stripeInvoiceUrl,
          type: type?.name
        };
      });
  });

  const columns: TableColumn[] = [
    { id: 'date', title: 'Date', type: 'SHORT_TEXT' },
    { id: 'amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'type',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
    {
      hide: true,
      id: 'receipt',
      render: (receiptUrl: string) => {
        return (
          <Button tertiary href={receiptUrl}>
            Receipt
          </Button>
        );
      },
      title: 'Receipt',
      type: 'CUSTOM'
    }
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

const MembershipPaymentOverview: React.FC = () => {
  const { loading } = useQuery<IMemberPayment[]>({
    name: 'getMemberPayments',
    query: GET_MEMBER_PAYMENTS,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection className="s-membership-overview-ctr">
      <LoadingHeader h2 loading={loading} title="Payment Overview" />
      <MembershipPaymentScheduledCard />
      <MembershipPaymentTable />
    </MainSection>
  );
};

export default MembershipPaymentOverview;
