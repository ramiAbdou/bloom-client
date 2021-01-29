import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { MainContent } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import { GET_DATABASE } from '@scenes/Database/Database.gql';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import Admins from './Admins/Admins';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => {
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
        <Route component={MemberDatabase} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </MainContent>
  );
};

export default Database;
