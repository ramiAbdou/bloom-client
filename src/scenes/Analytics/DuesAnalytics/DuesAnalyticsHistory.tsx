import day from 'dayjs';
import { nanoid } from 'nanoid';
import React from 'react';

import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import { TableColumn, TableOptions, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { ICommunity, IMember, IMemberPayment, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { GET_PAYMENTS } from '../Analytics.gql';

interface DuesAnalyticsHistoryTableData {
  Amount: string;
  id: string;
  Email: string;
  'Full Name': string;
  'Paid On': string;
}

const DuesAnalyticsHistoryTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byTypeId } = db.entities.types;
    const { byId: byUserId } = db.entities.users;

    const result: DuesAnalyticsHistoryTableData[] = db.community.members?.reduce(
      (acc: DuesAnalyticsHistoryTableData[], memberId: string) => {
        const member: IMember = byMemberId[memberId];

        const payments: DuesAnalyticsHistoryTableData[] = member.payments?.map(
          (paymentId: string) => {
            const { amount, createdAt, type }: IMemberPayment = byPaymentId[
              paymentId
            ];

            const typeName = byTypeId[type].name;

            const { firstName, lastName, email }: IUser = byUserId[member.user];

            return {
              Amount: `$${(amount / 100).toFixed(2)}`,
              Email: email,
              'Full Name': `${firstName} ${lastName}`,
              'Membership Plan': typeName,
              'Paid On': day(createdAt).format('MMMM DD, YYYY @ h:mm A'),
              id: nanoid()
            };
          }
        );

        return payments?.length ? [...acc, ...payments] : acc;
      },
      []
    );

    return result;
  });

  const columns: TableColumn[] = [
    { id: 'Full Name', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'Membership Plan',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
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
  const { data, loading } = useQuery<ICommunity>({
    name: 'getPayments',
    query: GET_PAYMENTS,
    schema: Schema.COMMUNITY
  });

  if (!data?.payments?.length) return null;

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
