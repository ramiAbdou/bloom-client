import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

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
  <Loading.Provider>
    <DatabaseContent />
  </Loading.Provider>
);
