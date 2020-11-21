/**
 * @fileoverview Scene: Database
 * @author Rami Abdou
 */

import './Database.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Admins from './components/Admins/Admins';
import Header from './components/Header';
import Members from './components/Members/Members';
import { GET_DATABASE } from './Database.gql';

export default () => {
  const { url } = useRouteMatch();
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    if (data?.getDatabase)
      updateEntities({
        data: { ...data.getDatabase },
        schema: Schema.COMMUNITY
      });
  }, [data]);

  return (
    <>
      <Header loading={loading} />
      <Switch>
        <Route component={Admins} path={`${url}/admins`} />
        <Route component={Members} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </>
  );
};
