import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@templates/Main/Content';
import Loading from '@store/Loading.store';
import Header from './components/Header';
import useFetchDatabase from './hooks/useFetchDatabase';
import Admins from './pages/Admins/Admins';
import Members from './pages/Members/Members';

const DatabaseContent = () => {
  const { url } = useRouteMatch();
  useFetchDatabase();

  return (
    <>
      <Header />

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
