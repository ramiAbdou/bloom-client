import day from 'dayjs';
import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventMainInformationDate: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const startDay: string = day(event.startTime).format('dddd, MMMM Do');
  const startHour: string = day(event.startTime).format('h:mm A');
  const endHour: string = day(event.endTime).format('h:mm A z');

  return (
    <div className="s-events-individual-header-date">
      <h4>{startDay}</h4>
      <h4>{`${startHour} - ${endHour}`}</h4>
    </div>
  );
};

IndividualEventMainInformationDate.fragment = gql`
  fragment IndividualEventMainInformationDateFragment on events {
    endTime
    startTime
  }
`;

export default IndividualEventMainInformationDate;
