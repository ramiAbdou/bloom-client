import React from 'react';

import { gql } from '@apollo/client';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventMainInformationCommunity: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const isMember: boolean = useIsMember();
  if (isMember) return null;
  return <p className="meta">Hosted by {event.community.name}</p>;
};

IndividualEventMainInformationCommunity.fragment = gql`
  fragment IndividualEventMainInformationCommunityFragment on events {
    community {
      name
    }
  }
`;

export default IndividualEventMainInformationCommunity;
