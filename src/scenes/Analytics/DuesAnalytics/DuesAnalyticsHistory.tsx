import day from 'dayjs';
import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Table from '@organisms/Table/Table';
import { Column, Row, TableOptions } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMember, IMemberPayment, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import { uuid } from '@util/util';
import useFetchDuesHistory from './useFetchDuesHistory';

const DuesAnalyticsHistoryTable: React.FC = () => {
  const rows: Row[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byUserId } = db.entities.users;

    return db.member.payments?.map((paymentId: string) => {
      const {
        amount,
        createdAt,
        member: memberId
      }: IMemberPayment = byPaymentId[paymentId];

      const member: IMember = byMemberId[memberId];
      const { firstName, lastName, email }: IUser = byUserId[member.user];

      return {
        Amount: `$${amount / 100}.00`,
        Email: email,
        'First Name': firstName,
        'Last Name': lastName,
        'Paid On': day(createdAt).format('MMMM DD, YYYY'),
        id: uuid()
      };
    });
  });

  const columns: Column[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    { id: 'Paid On', title: 'Paid On', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false,
    showCount: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableContent emptyMessage="Looks like nobody has paid dues in the last year." />
    </Table>
  );
};

const DuesAnalyticsHistory: React.FC = () => {
  const { loading } = useFetchDuesHistory();

  return (
    <MainSection loading={loading} title="Dues History">
      <DuesAnalyticsHistoryTable />
    </MainSection>
  );
};

export default DuesAnalyticsHistory;
