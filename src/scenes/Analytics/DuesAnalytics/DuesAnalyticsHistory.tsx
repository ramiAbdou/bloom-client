import day from 'dayjs';
import React from 'react';

import { ModalType } from '@constants';
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
import { IMember, IMemberPayment, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
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
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const result: DuesAnalyticsHistoryTableData[] = db.community.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.map((payment: IMemberPayment) => {
        const { amount, createdAt, type }: IMemberPayment = payment;
        const member: IMember = db.byMemberId[payment?.member];
        const user: IUser = db.byUserId[member?.user];
        const { firstName, lastName, email }: IUser = user;

        return {
          amount: `$${(amount / 100).toFixed(2)}`,
          email,
          fullName: `${firstName} ${lastName}`,
          id: member.id,
          paidOn: day(createdAt).format('MMM DD, YYYY @ h:mm A'),
          type: db.byTypeId[type].name
        };
      }, []);

    return result;
  })?.sort((a, b) => sortObjects(a, b, 'paidOn'));

  const columns: TableColumn[] = [
    { id: 'paidOn', title: 'Paid On', type: 'SHORT_TEXT' },
    { id: 'fullName', title: 'Full Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'type',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    }
  ];

  const options: TableOptions = {
    onRowClick: (row: TableRow) => {
      showModal({ id: ModalType.MEMBER_PROFILE, metadata: row?.id });
    }
  };

  return (
    <Table columns={columns} options={options} rows={rows}>
      <TableSearchBar className="mb-sm" />
      <TableContent emptyMessage="Looks like nobody has paid dues in the last year." />
    </Table>
  );
};

const DuesAnalyticsHistory: React.FC = () => {
  const { data, loading } = useQuery<IMemberPayment[]>({
    operation: 'getPayments',
    query: GET_PAYMENTS,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection className="s-analytics-dues-history" show={!!data?.length}>
      <LoadingHeader h2 loading={loading} title="Dues History" />
      {!loading && <DuesAnalyticsHistoryTable />}
    </MainSection>
  );
};

export default DuesAnalyticsHistory;
