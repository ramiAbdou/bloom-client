import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Scene from '@components/containers/Scene';
import MemberRoute from '../../router/routes/MemberRoute';
import IndividualEvent from './IndividualEvent/IndividualEvent';
import PastEvents from './PastEvents';
import UpcomingEvents from './UpcomingEvents';

const Events: React.FC = () => (
  <Scene>
    <Switch>
      <MemberRoute
        exact
        component={UpcomingEvents}
        path="/:urlName/events/upcoming"
      />

      <MemberRoute exact component={PastEvents} path="/:urlName/events/past" />

      <Route
        exact
        component={IndividualEvent}
        path="/:urlName/events/:eventId"
      />

      <Redirect to="/:urlName/events/upcoming" />
    </Switch>
  </Scene>
);

export default Events;
