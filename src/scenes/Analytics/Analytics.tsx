import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import { NavigationOptionProps } from '@containers/Main/MainNavigation';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import DuesAnalytics from './DuesAnalytics/DuesAnalytics';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const AnalyticsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const canCollectDues = useStoreState(({ db }) => db.community.canCollectDues);

  const { push } = useHistory();

  const duesOptions: NavigationOptionProps[] = canCollectDues
    ? [{ onClick: () => push('dues'), pathname: 'dues', title: 'Dues' }]
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
      { data: ['id', 'value', { question: ['id'] }] },
      { type: ['id'] }
    ],
    operation: 'getDatabase',
    schema: [Schema.MEMBER]
  });

  return (
    <MainContent>
      <AnalyticsHeader loading={loading} />

      <Show show={!loading}>
        <Switch>
          <Route component={DuesAnalytics} path={`${url}/dues`} />
          <Route component={EventsAnalytics} path={`${url}/events`} />
          <Route component={MembersAnalytics} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </Show>
    </MainContent>
  );
};

export default Analytics;
