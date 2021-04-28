import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventMainInformationTitle: ComponentWithFragments<IEvent> = ({
  data: event
}) => <h1>{event.title}</h1>;

IndividualEventMainInformationTitle.fragment = gql`
  fragment IndividualEventMainInformationTitleFragment on events {
    title
  }
`;

export default IndividualEventMainInformationTitle;
