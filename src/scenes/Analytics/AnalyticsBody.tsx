import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import useFetchDatabase from '../Database/useFetchDatabase';
import DuesAnalytics from './DuesAnalytics/DuesAnalytics';
import EventsAnalytics from './EventsAnalytics/Events';
import MembersAnalytics from './MembersAnalytics/MembersAnalytics';

const AnalyticsBody: React.FC = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <MainContent loading={loading}>
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
