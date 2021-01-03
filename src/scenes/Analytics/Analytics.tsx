import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@components/Main/Content';
import useQuery from '@hooks/useQuery';
import { GET_DATABASE, GetDatabaseResult } from '@scenes/Database/Database.gql';
import Loading from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import AnalyticsHeader from './components/Header';
import DuesAnalytics from './pages/Dues/Dues';
import EventsAnalytics from './pages/Events/Events';
import MembersAnalytics from './pages/Members/Members';

const useFetchDatabase = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  const { data: community, loading } = useQuery<GetDatabaseResult>({
    name: 'getDatabase',
    query: GET_DATABASE
  });

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (!community) return;
    mergeEntities({ data: community, schema: Schema.COMMUNITY });
  }, [community]);
};

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
