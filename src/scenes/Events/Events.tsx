import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import IndividualEvent from './IndividualEvent/IndividualEvent';
import PastEvents from './PastEvents';
import UpcomingEvents from './UpcomingEvents';

const Events: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route component={UpcomingEvents} path={`${url}/upcoming`} />
      <Route component={PastEvents} path={`${url}/past`} />
      <Route component={IndividualEvent} path={`${url}/:eventId`} />
      <Redirect to={`${url}/upcoming`} />
    </Switch>
  );
};

export default Events;
