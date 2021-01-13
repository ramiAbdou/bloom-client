import day from 'dayjs';
import React from 'react';

import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import { Column, Row, TableOptions } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { IMember, IMemberPayment, IUser } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { uuid } from '@util/util';
import { GET_DUES_HISTORY } from '../Analytics.gql';

interface DuesAnalyticsHistoryTableData {
  Amount: string;
  id: string;
  Email: string;
  'Full Name': string;
  'Paid On': string;
}

const DuesAnalyticsHistoryTable: React.FC = () => {
  const rows: Row[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byUserId } = db.entities.users;

    const result: DuesAnalyticsHistoryTableData[] = db.community.members?.reduce(
      (acc: DuesAnalyticsHistoryTableData[], memberId: string) => {
        const member: IMember = byMemberId[memberId];

        const payments: DuesAnalyticsHistoryTableData[] = member.payments?.map(
          (paymentId: string) => {
            const { amount, createdAt }: IMemberPayment = byPaymentId[
              paymentId
            ];

            const { firstName, lastName, email }: IUser = byUserId[member.user];

            return {
              Amount: `$${amount / 100}.00`,
              Email: email,
              'Full Name': `${firstName} ${lastName}`,
              'Paid On': day(createdAt).format('MMMM DD, YYYY'),
              id: uuid()
            };
          }
        );

        return payments?.length ? [...acc, ...payments] : acc;
      },
      []
    );

    return result;
  });

  const columns: Column[] = [
    { id: 'Full Name', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    { id: 'Paid On', title: 'Paid On', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableSearchBar />
      <TableContent emptyMessage="Looks like nobody has paid dues in the last year." />
    </Table>
  );
};

const DuesAnalyticsHistory: React.FC = () => {
  const { loading } = useQuery<IMemberPayment[]>({
    name: 'getDuesHistory',
    query: GET_DUES_HISTORY,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection
      className="s-analytics-dues-history"
      loading={loading}
      title="Dues History"
    >
      <DuesAnalyticsHistoryTable />
    </MainSection>
  );
};

export default DuesAnalyticsHistory;
