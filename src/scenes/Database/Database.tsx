import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import Show from '@containers/Show';
import AdminDatabase from './AdminDatabase/AdminDatabase';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';
import useInitDatabase from './useInitDatabase';

const Database: React.FC = () => {
  const { url } = useRouteMatch();
  const { loading } = useInitDatabase();

  return (
    <MainContent>
      <DatabaseHeader loading={loading} />

      <Show show={!loading}>
        <Switch>
          <Route component={AdminDatabase} path={`${url}/admins`} />
          <Route component={MemberDatabase} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </Show>
    </MainContent>
  );
};

export default Database;
