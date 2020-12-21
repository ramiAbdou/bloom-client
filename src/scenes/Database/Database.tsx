import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Admins from './components/Admins/Admins';
import Header from './components/Header';
import Members from './components/Members/Members';
import { GET_DATABASE } from './Database.gql';
import Database from './Database.store';

const useFetchDatabase = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((store) => store.setLoading);

  const { data: community, loading } = useQuery<ICommunity>({
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

    // After fetching the member database, we update both the members AND
    // the member questions.
    mergeEntities({ data: community, schema: Schema.COMMUNITY });
  }, [community]);
};

const DatabaseContent = () => {
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <>
      <Header />

      <div className="s-home-content">
        <Switch>
          <Route component={Admins} path={`${url}/admins`} />
          <Route component={Members} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </div>
    </>
  );
};

export default () => (
  <Database.Provider>
    <DatabaseContent />
  </Database.Provider>
);
