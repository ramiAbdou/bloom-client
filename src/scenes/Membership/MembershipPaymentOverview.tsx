import day from 'dayjs';
import { nanoid } from 'nanoid';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import {
  GET_MEMBER_PAYMENTS,
  GET_UPCOMING_PAYMENT,
  GetUpcomingPaymentResult
} from './Membership.gql';

const MembershipPaymentNextDueCard: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);

  const { data, loading } = useQuery<GetUpcomingPaymentResult>({
    name: 'getUpcomingPayment',
    query: GET_UPCOMING_PAYMENT
  });

  const { amount, nextPaymentDate } = data ?? {};

  return (
    <Card
      className="s-membership-card s-membership-card--next"
      loading={loading}
      show={!loading && !!amount}
    >
      <h4>{autoRenew ? 'Next Scheduled Payment' : 'Next Payment Due'}</h4>

      <Row spaceBetween>
        <p>{day(nextPaymentDate).format('MMM D, YYYY')}</p>
        <p>${amount?.toFixed(2)}</p>
      </Row>
    </Card>
  );
};

const MembershipPaymentTable: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byPaymentId } = db.entities.payments;
    const { byId: byTypeId } = db.entities.types;

    return db.member.payments?.map((paymentId: string) => {
      const {
        amount,
        createdAt,
        stripeInvoiceUrl,
        type
      }: IMemberPayment = byPaymentId[paymentId];

      const typeName = byTypeId[type].name;

      return {
        Amount: `$${(amount / 100).toFixed(2)}`,
        Date: day(createdAt).format('MMMM DD, YYYY'),
        'Membership Plan': typeName,
        Receipt: (
          <Button tertiary href={stripeInvoiceUrl}>
            Receipt
          </Button>
        ),
        id: nanoid()
      };
    });
  });

  const columns: TableColumn[] = [
    { id: 'Date', title: 'Date', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'Membership Plan',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
    { hide: true, id: 'Receipt', title: 'Receipt', type: 'CUSTOM' }
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
      <MembershipPaymentNextDueCard />
      <MembershipPaymentTable />
    </MainSection>
  );
};

export default MembershipPaymentOverview;
