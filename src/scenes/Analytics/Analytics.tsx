import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import useFetchDatabase from '../Database/useFetchDatabase';
import AnalyticsHeader from './AnalyticsHeader';
import DuesAnalytics from './pages/Dues/Dues';
import EventsAnalytics from './pages/Events/Events';
import MembersAnalytics from './pages/Members/Members';

const AnalyticsContent = () => {
  const loading = Loading.useStoreState((store) => store.loading);

  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <>
      <AnalyticsHeader />

      <MainContent loading={loading}>
        <Switch>
          <Route component={DuesAnalytics} path={`${url}/dues`} />
          <Route component={EventsAnalytics} path={`${url}/events`} />
          <Route component={MembersAnalytics} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </MainContent>
    </>
  );
};

export default () => (
  <Loading.Provider>
    <AnalyticsContent />
  </Loading.Provider>
);
