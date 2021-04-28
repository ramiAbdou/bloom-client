import React from 'react';

import { gql } from '@apollo/client';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { ComponentWithFragments } from '@util/constants';
import { EventPrivacy, IEvent } from '@util/constants.entities';

const IndividualEventMainInformationPrivacyTag: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <HeaderTag>
    {event.privacy === EventPrivacy.MEMBERS_ONLY
      ? 'Members Only'
      : 'Open to All'}
  </HeaderTag>
);

IndividualEventMainInformationPrivacyTag.fragment = gql`
  fragment IndividualEventMainInformationPrivacyTagFragment on events {
    privacy
  }
`;

export default IndividualEventMainInformationPrivacyTag;
