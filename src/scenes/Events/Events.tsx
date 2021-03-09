import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import EventsHeader from './EventsHeader';
import EventsPast from './EventsPast';
import EventsUpcoming from './EventsUpcoming';
import IndividualEvent from './IndividualEvent/IndividualEvent';

const Events: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent>
      <EventsHeader />

      <Switch>
        <Route exact component={EventsUpcoming} path={`${url}/upcoming`} />
        <Route exact component={EventsPast} path={`${url}/past`} />
        <Route exact component={IndividualEvent} path={`${url}/:eventId`} />
        <Redirect to={`${url}/upcoming`} />
      </Switch>
    </MainContent>
  );
};

export default Events;
