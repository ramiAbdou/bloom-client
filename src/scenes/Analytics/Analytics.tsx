import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import { LoadingProps } from '@constants';
import { MainHeader } from '@containers/Main';
import MainContent from '@containers/Main/MainContent';
import { NavigationOptionProps } from '@containers/Main/MainNavigation';
import useQuery from '@hooks/useQuery';
import { GET_DATABASE } from '@scenes/Database/Database.gql';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import DuesAnalytics from './DuesAnalytics/DuesAnalytics';
import EventsAnalytics from './EventsAnalytics/Events';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const AnalyticsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    { onClick: () => push('dues'), pathname: 'dues', title: 'Dues' },
    { onClick: () => push('events'), pathname: 'events', title: 'Events' }
  ];

  return (
    <MainHeader
      className="s-analytics-header"
      loading={loading}
      options={options}
      title="Analytics"
    />
  );
};

const Analytics: React.FC = () => {
  const { url } = useRouteMatch();

  const { loading } = useQuery<ICommunity>({
    name: 'getDatabase',
    query: GET_DATABASE,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={AnalyticsHeader} loading={loading}>
      <Switch>
        <Route component={DuesAnalytics} path={`${url}/dues`} />
        <Route component={EventsAnalytics} path={`${url}/events`} />
        <Route component={MembersAnalytics} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </MainContent>
  );
};

export default Analytics;
