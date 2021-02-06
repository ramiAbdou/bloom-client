import day from 'dayjs';
import { nanoid } from 'nanoid';
import React from 'react';

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
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { ICommunity, IMember, IMemberPayment, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { GET_PAYMENTS } from '../Analytics.gql';

interface DuesAnalyticsHistoryTableData {
  amount: string;
  id: string;
  email: string;
  fullName: string;
  paidOn: string;
  type: string;
}

const DuesAnalyticsHistoryTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const result: DuesAnalyticsHistoryTableData[] = db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => !!member?.user)
      ?.reduce((acc: DuesAnalyticsHistoryTableData[], member: IMember) => {
        const payments: DuesAnalyticsHistoryTableData[] = member.payments?.map(
          (paymentId: string) => {
            const { amount, createdAt, type }: IMemberPayment = db.byPaymentId[
              paymentId
            ];

            const { firstName, lastName, email }: IUser = db.byUserId[
              member.user
            ];

            return {
              amount: `$${(amount / 100).toFixed(2)}`,
              email,
              fullName: `${firstName} ${lastName}`,
              id: nanoid(),
              paidOn: day(createdAt).format('MMM DD, YYYY @ h:mm A'),
              type: db.byTypeId[type].name
            };
          }
        );

        return payments?.length ? [...acc, ...payments] : acc;
      }, []);

    return result;
  })?.sort((a, b) => sortObjects(a, b, 'paidOn', 'DESC'));

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'type',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
    { id: 'paidOn', title: 'Paid On', type: 'SHORT_TEXT' }
  ];

  const options: TableOptions = {
    alignEndRight: true,
    fixFirstColumn: false,
    isSortable: false
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableSearchBar className="mb-sm" />
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

  return (
    <MainSection
      className="s-analytics-dues-history"
      show={!!data?.payments?.length}
    >
      <LoadingHeader h2 loading={loading} title="Dues History" />
      {!loading && <DuesAnalyticsHistoryTable />}
    </MainSection>
  );
};

export default DuesAnalyticsHistory;
