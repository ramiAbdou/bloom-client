import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Admins from './components/Admins/Admins';
import Header from './components/Header';
import Members from './components/Members/Members';
import { GET_DATABASE } from './Database.gql';
import Database from './Database.store';

const FetchDatabase = () => {
  const storeFromFetch = useStoreActions((store) => store.storeFromFetch);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((store) => store.setLoading);

  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const result = data?.getDatabase;
    if (!result) return;

    // After fetching the member database, we update both the members AND
    // the member questions.
    storeFromFetch({
      data: {
        ...result,
        members: result.members,
        questions: result.questions
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  return null;
};

export default () => {
  const { url } = useRouteMatch();

  return (
    <Database.Provider>
      <FetchDatabase />
      <Header />

      <div className="s-home-content">
        <Switch>
          <Route component={Admins} path={`${url}/admins`} />
          <Route component={Members} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </div>
    </Database.Provider>
  );
};
