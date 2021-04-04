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
import { IMemberType, IPayment } from '@store/db/Db.entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';

const columns: TableColumn[] = [
  { id: 'paidOn', title: 'Date' },
  { id: 'amount', title: 'Amount' },
  { id: 'type', title: 'Membership Type', type: QuestionType.MULTIPLE_CHOICE },
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
  const rows: TableRow[] = useStoreState(({ db }) =>
    db.member.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.filter((payment: IPayment) => !!payment?.memberType)
      ?.map((payment: IPayment) => {
        const { createdAt, id, stripeInvoiceUrl: receipt } = payment;
        const memberType: IMemberType = db.byMemberTypeId[payment.memberType];
        const amount = `$${payment.amount.toFixed(2)}`;
        const paidOn = day(createdAt).format('MMM DD, YYYY');

        return {
          amount,
          createdAt,
          id,
          paidOn,
          receipt,
          status: true,
          type: memberType?.name
        };
      })
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'))
  );

  const options: TableOptions = {
    isSortable: false,
    showCount: false
  };

  return (
    <Table columns={columns} options={options}>
      <TableContent
        emptyMessage="Looks like you haven't made any payments."
        rows={rows}
      />
    </Table>
  );
};

export default MembershipPaymentTable;
