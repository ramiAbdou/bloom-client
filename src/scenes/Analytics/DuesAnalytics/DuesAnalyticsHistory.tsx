import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import TableSearchBar from '@organisms/Table/TableSeachBar';
import { IMember, IMemberPayment, IUser } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import useInitDuesAnalyticsHistory from './useInitDuesAnalyticsHistory';

interface DuesAnalyticsHistoryTableData {
  amount: string;
  id: string;
  email: string;
  fullName: string;
  paidOn: string;
  type: string;
}

const columns: TableColumn[] = [
  { id: 'paidOn', title: 'Paid On', type: QuestionType.SHORT_TEXT },
  { id: 'fullName', title: 'Full Name', type: QuestionType.SHORT_TEXT },
  { id: 'email', title: 'Email', type: QuestionType.SHORT_TEXT },
  { id: 'amount', title: 'Amount', type: QuestionType.SHORT_TEXT },
  {
    id: 'type',
    title: 'Membership Plan',
    type: QuestionType.MULTIPLE_CHOICE
  }
];

const DuesAnalyticsHistoryTable: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    const result: DuesAnalyticsHistoryTableData[] = db.community.payments
      ?.map((paymentId: string) => db.byPaymentId[paymentId])
      ?.map((payment: IMemberPayment) => {
        const { amount, createdAt, plan }: IMemberPayment = payment;
        const member: IMember = db.byMemberId[payment?.member];
        const user: IUser = db.byUserId[member?.user];
        const { email }: IUser = user;

        return {
          amount: `$${amount.toFixed(2)}`,
          email,
          fullName: `${member?.firstName} ${member?.lastName}`,
          id: member.id,
          paidOn: day(createdAt).format('MMM DD, YYYY @ h:mm A'),
          type: db.byMemberPlanId[plan].name
        };
      }, []);

    return result;
  })?.sort((a, b) => sortObjects(a, b, 'paidOn'));

  const options: TableOptions = {
    onRowClick: (row: TableRow) => {
      showModal({ id: ModalType.PROFILE, metadata: row?.id });
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
  const { data, loading } = useInitDuesAnalyticsHistory();

  return (
    <MainSection className="s-analytics-dues-history" show={!!data?.length}>
      <LoadingHeader h2 loading={loading} title="Dues History" />
      {!loading && <DuesAnalyticsHistoryTable />}
    </MainSection>
  );
};

export default DuesAnalyticsHistory;
