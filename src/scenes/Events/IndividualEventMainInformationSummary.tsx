import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventMainInformationSummary: ComponentWithFragments<IEvent> = ({
  data: event
}) => (event.summary ? <p>{event.summary}</p> : null);

IndividualEventMainInformationSummary.fragment = gql`
  fragment IndividualEventMainInformationSummaryFragment on events {
    summary
  }
`;

export default IndividualEventMainInformationSummary;
