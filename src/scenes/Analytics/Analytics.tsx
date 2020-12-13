import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { GET_DATABASE } from '@scenes/Database/Database.gql';
import Loading from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import AnalyticsDues from './components/Dues/Dues';
import AnalyticsEvents from './components/Events/Events';
import AnalyticsHeader from './components/Header';
import AnalyticsMembers from './components/Members/Members';

const useFetchDatabase = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const { id, members, questions } = data?.getDatabase ?? {};
    if (!id) return;

    // After fetching the member database, we update both the members AND
    // the member questions.
    mergeEntities({
      data: { id, members, questions },
      schema: Schema.COMMUNITY
    });
  }, [data]);
};

const AnalyticsContent = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <>
      <AnalyticsHeader />

      {!loading && (
        <div className="s-home-content">
          <Switch>
            <Route component={AnalyticsDues} path={`${url}/dues`} />
            <Route component={AnalyticsEvents} path={`${url}/events`} />
            <Route component={AnalyticsMembers} path={`${url}/members`} />
            <Redirect to={`${url}/members`} />
          </Switch>
        </div>
      )}
    </>
  );
};

export default () => (
  <Loading.Provider>
    <AnalyticsContent />
  </Loading.Provider>
);
