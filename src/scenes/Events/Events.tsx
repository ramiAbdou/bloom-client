import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Scene from '@components/containers/Scene';
import MemberRoute from '../../router/routes/MemberRoute';
import EventsPast from './EventsPast';
import EventsUpcoming from './EventsUpcoming';
import IndividualEvent from './IndividualEvent/IndividualEvent';

const Events: React.FC = () => (
  <Scene>
    <Switch>
      <MemberRoute
        exact
        component={EventsUpcoming}
        path="/:urlName/events/upcoming"
      />

      <MemberRoute exact component={EventsPast} path="/:urlName/events/past" />

      <MemberRoute
        exact
        component={IndividualEvent}
        path="/:urlName/events/:eventId"
        redirect={false}
      />

      <Redirect to="/:urlName/events/upcoming" />
    </Switch>
  </Scene>
);

export default Events;
