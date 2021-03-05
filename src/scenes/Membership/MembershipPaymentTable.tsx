import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMemberPayment, IMemberPlan } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const columns: TableColumn[] = [
  { id: 'paidOn', title: 'Date' },
  { id: 'amount', title: 'Amount' },
  { id: 'type', title: 'Membership Plan', type: QuestionType.MULTIPLE_CHOICE },
  {
    format: (value: boolean) => (value ? 'Succeeded' : 'Failed'),
    id: 'status',
    title: 'Status',
    type: QuestionType.TRUE_FALSE
  },
  {
    hideTitle: true,
    id: 'receipt',
    render: (receiptUrl: string) => (
      <Button tertiary href={receiptUrl}>
        Receipt
      </Button>
    ),
    title: 'Receipt'
  }
];

const MembershipPaymentTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    return db.member.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.filter((payment: IMemberPayment) => !!payment?.plan)
      ?.map((payment: IMemberPayment) => {
        const { createdAt, id, stripeInvoiceUrl: receipt } = payment;
        const plan: IMemberPlan = db.byMemberPlanId[payment.plan];

        const amount = `$${payment.amount.toFixed(2)}`;
        const paidOn = day(createdAt).format('MMM DD, YYYY');

        return {
          amount,
          createdAt,
          id,
          paidOn,
          receipt,
          status: true,
          type: plan?.name
        };
      })
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'));
  });

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

export default MembershipPaymentTable;
