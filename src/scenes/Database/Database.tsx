/**
 * @fileoverview Scene: Database

 */

import './Database.scss';

import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Admins from './components/Admins/Admins';
import Header from './components/Header/Header';
import Members from './components/Members/Members';
import Database from './Database.store';

export default () => {
  const { url } = useRouteMatch();

  return (
    <Database.Provider>
      <Header />
      <Switch>
        <Route component={Admins} path={`${url}/admins`} />
        <Route component={Members} path={`${url}/members`} />
        <Redirect to={`${url}/members`} />
      </Switch>
    </Database.Provider>
  );
};
