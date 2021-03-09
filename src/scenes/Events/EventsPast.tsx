import React from 'react';

import EventsPastSection from './EventsPastSection';
import EventsPastYourSection from './EventsPastYourSection';
import useInitPastEvents from './useInitPastEvents';

const EventsPast: React.FC = () => {
  const { loading } = useInitPastEvents();

  return (
    <>
      <EventsPastYourSection loading={loading} />
      <EventsPastSection loading={loading} />
    </>
  );
};

export default EventsPast;
