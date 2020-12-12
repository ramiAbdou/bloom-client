import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Analytics from './Analytics.store';
import AnalyticsDues from './components/Dues/Dues';
import AnalyticsEvents from './components/Events/Events';
import AnalyticsHeader from './components/Header';
import AnalyticsMembers from './components/Members/Members';

export default () => {
  const { url } = useRouteMatch();

  return (
    <Analytics.Provider>
      <AnalyticsHeader />

      <div className="s-home-content">
        <Switch>
          <Route component={AnalyticsDues} path={`${url}/dues`} />
          <Route component={AnalyticsEvents} path={`${url}/events`} />
          <Route component={AnalyticsMembers} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </div>
    </Analytics.Provider>
  );
};
