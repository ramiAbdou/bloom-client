import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAspectBackground from './EventsAspectBackground';
import IndividualEventMainInformation from './IndividualEventMainInformation';

const IndividualEventMain: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <div className="cg-md d-grid p-md s-events-individual-header">
    <EventsAspectBackground imageUrl={event.imageUrl} />
    <IndividualEventMainInformation data={event} />
  </div>
);

IndividualEventMain.fragment = gql`
  fragment IndividualEventMainFragment on events {
    imageUrl
    ...IndividualEventMainInformationFragment
  }
  ${IndividualEventMainInformation.fragment}
`;

export default IndividualEventMain;
