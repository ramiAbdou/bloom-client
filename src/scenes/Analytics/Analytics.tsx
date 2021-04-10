import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import AnalyticsHeader from './AnalyticsHeader';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const Analytics: React.FC = () => (
  <Scene>
    <MainContent>
      <AnalyticsHeader />

      <Switch>
        <Route component={EventsAnalytics} path="/:urlName/analytics/events" />

        <Route
          component={MembersAnalytics}
          path="/:urlName/analytics/members"
        />

        <Redirect to="/:urlName/analytics/members" />
      </Switch>
    </MainContent>
  </Scene>
);

export default Analytics;
