import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import Admins from './Admins/Admins';
import DatabaseHeader from './DatabaseHeader';
import Members from './Members/Members';
import useFetchDatabase from './useFetchDatabase';

const DatabaseContent = () => {
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <>
      <DatabaseHeader />

      <MainContent>
        <Switch>
          <Route component={Admins} path={`${url}/admins`} />
          <Route component={Members} path={`${url}/members`} />
          <Redirect to={`${url}/members`} />
        </Switch>
      </MainContent>
    </>
  );
};

export default () => (
  <Loading.Provider>
    <DatabaseContent />
  </Loading.Provider>
);
