import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import AnalyticsHeader from './AnalyticsHeader';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';
import PaymentAnalytics from './PaymentAnalytics/PaymentAnalytics';

const Analytics: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent>
      <AnalyticsHeader />

      <Switch>
        <Route component={EventsAnalytics} path={`${url}/events`} />
        <Route component={MembersAnalytics} path={`${url}/members`} />
        <Route component={PaymentAnalytics} path={`${url}/payments`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </MainContent>
  );
};

export default Analytics;
