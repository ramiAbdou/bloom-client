import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import useFetchDatabase from '../Database/useFetchDatabase';
import DuesAnalytics from './DuesAnalytics/DuesAnalytics';
import EventsAnalytics from './EventsAnalytics/Events';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const AnalyticsBody: React.FC = () => {
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <MainContent>
      <Switch>
        <Route component={DuesAnalytics} path={`${url}/dues`} />
        <Route component={EventsAnalytics} path={`${url}/events`} />
        <Route component={MembersAnalytics} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </MainContent>
  );
};

export default AnalyticsBody;
