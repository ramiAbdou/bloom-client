import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Scene from '@containers/Scene';
import IndividualEvent from './IndividualEvent/IndividualEvent';
import PastEvents from './PastEvents';
import UpcomingEvents from './UpcomingEvents';

const Events: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Scene>
      <Switch>
        <Route exact component={UpcomingEvents} path={`${url}/upcoming`} />
        <Route exact component={PastEvents} path={`${url}/past`} />
        <Route exact component={IndividualEvent} path={`${url}/:eventId`} />
        <Redirect to={`${url}/upcoming`} />
      </Switch>
    </Scene>
  );
};

export default Events;
