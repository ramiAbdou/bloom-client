import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventAboutCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <Card className="s-events-individual-card" title="About This Event">
    <p className="preserve-newlines">{event.description}</p>
  </Card>
);

IndividualEventAboutCard.fragment = gql`
  fragment IndividualEventAboutCardFragment on events {
    description
  }
`;

export default IndividualEventAboutCard;
