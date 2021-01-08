import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { MainContent } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import { GET_DATABASE } from '@scenes/Database/Database.gql';
import { ICommunity } from '@store/entities';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import Admins from './Admins/Admins';
import DatabaseHeader from './DatabaseHeader';
import Members from './Members/Members';

const DatabaseContent = () => {
  const { url } = useRouteMatch();

  const { loading } = useQuery<ICommunity>({
    name: 'getDatabase',
    query: GET_DATABASE,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={DatabaseHeader} loading={loading}>
      <Switch>
        <Route component={Admins} path={`${url}/admins`} />
        <Route component={Members} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </MainContent>
  );
};

const Database: React.FC = () => (
  <LoadingStore.Provider>
    <DatabaseContent />
  </LoadingStore.Provider>
);

export default Database;
