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
import { IMemberPayment, IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const MembershipPaymentTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    return db.member.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.filter((payment: IMemberPayment) => !!payment?.type)
      ?.map((payment: IMemberPayment) => {
        const { createdAt, id, stripeInvoiceUrl: receipt } = payment;
        const type: IMemberType = db.byTypeId[payment.type];
        const amount = `$${(payment.amount / 100).toFixed(2)}`;
        const paidOn = day(createdAt).format('MMM DD, YYYY');
        return { amount, id, paidOn, receipt, type: type?.name };
      });
  });

  const columns: TableColumn[] = [
    { id: 'paidOn', title: 'Date' },
    { id: 'amount', title: 'Amount' },
    { id: 'type', title: 'Membership Plan', type: 'MULTIPLE_CHOICE' },
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
