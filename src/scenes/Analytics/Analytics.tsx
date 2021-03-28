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
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';
import Show from '@containers/Show';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';
import PaymentAnalytics from './PaymentAnalytics/PaymentAnalytics';
import useInitAnalytics from './useInitAnalytics';

const AnalyticsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const canCollectDues = useStoreState(({ db }) => {
    return db.community.canCollectDues;
  });

  const { push } = useHistory();

  const duesOptions: MainNavigationOptionProps[] = canCollectDues
    ? [
        {
          onClick: () => {
            return push('payments');
          },
          pathname: 'payments',
          title: 'Payments'
        }
      ]
    : [];

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => {
        return push('members');
      },
      pathname: 'members',
      title: 'Members'
    },
    ...duesOptions,
    {
      onClick: () => {
        return push('events');
      },
      pathname: 'events',
      title: 'Events'
    }
  ];

  return <MainHeader loading={loading} options={options} title="Analytics" />;
};

const Analytics: React.FC = () => {
  const { url } = useRouteMatch();
  const { loading } = useInitAnalytics();

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
