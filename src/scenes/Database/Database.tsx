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
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((actions) => actions.setLoading);

  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const result = data?.getDatabase;
    if (!result) return;

    console.log(result.memberships);

    // After fetching the member database, we update both the members AND
    // the membership questions.
    updateEntities({
      data: {
        ...result,
        memberships: result.memberships,
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
      <Switch>
        <Route component={Admins} path={`${url}/admins`} />
        <Route component={Members} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </Database.Provider>
  );
};
