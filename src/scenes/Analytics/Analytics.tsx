import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Scene from '@components/containers/Scene';
import EventsAnalytics from './EventsAnalytics/EventsAnalytics';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const Analytics: React.FC = () => (
  <Scene>
    <Switch>
      <Route component={EventsAnalytics} path="/:urlName/analytics/events" />
      <Route component={MembersAnalytics} path="/:urlName/analytics/members" />
      <Redirect to="/:urlName/analytics/members" />
    </Switch>
  </Scene>
);

export default Analytics;
