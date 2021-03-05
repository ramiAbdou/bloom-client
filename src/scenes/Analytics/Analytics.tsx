import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import { NavigationOptionProps } from '@containers/Main/MainNavigation';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';
import PaymentAnalytics from './PaymentAnalytics/PaymentAnalytics';

const AnalyticsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const canCollectDues = useStoreState(({ db }) => db.community.canCollectDues);

  const { push } = useHistory();

  const duesOptions: NavigationOptionProps[] = canCollectDues
    ? [
        {
          onClick: () => push('payments'),
          pathname: 'payments',
          title: 'Payments'
        }
      ]
    : [];

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    ...duesOptions,
    { onClick: () => push('events'), pathname: 'events', title: 'Events' }
  ];

  return <MainHeader loading={loading} options={options} title="Analytics" />;
};

const Analytics: React.FC = () => {
  const { url } = useRouteMatch();

  const { loading } = useQuery<IMember[]>({
    fields: [
      'id',
      'isDuesActive',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: 'getDatabase',
    schema: [Schema.MEMBER]
  });

  return (
    <MainContent>
      <AnalyticsHeader loading={loading} />

      <Show show={!loading}>
        <Switch>
          <Route component={EventsAnalytics} path={`${url}/events`} />
          <Route component={MembersAnalytics} path={`${url}/members`} />
          <Route component={PaymentAnalytics} path={`${url}/payments`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </Show>
    </MainContent>
  );
};

export default Analytics;
