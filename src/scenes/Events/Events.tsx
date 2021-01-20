import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import { GET_EVENTS } from './Events.gql';
import EventsHeader from './EventsHeader';
import PastEvents from './PastEvents';
import UpcomingEvents from './UpcomingEvents';

const Events: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent Header={EventsHeader}>
      <Switch>
        <Route component={UpcomingEvents} path={`${url}/upcoming`} />
        <Route component={PastEvents} path={`${url}/past`} />
        <Redirect to={`${url}/upcoming`} />
      </Switch>
    </MainContent>
  );
};

export default Events;
