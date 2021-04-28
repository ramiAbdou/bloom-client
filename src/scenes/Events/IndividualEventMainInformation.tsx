import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import IndividualEventMainInformationButtonRow from './IndividualEventMainInformationButtonRow';
import IndividualEventMainInformationCommunity from './IndividualEventMainInformationCommunity';
import IndividualEventMainInformationDate from './IndividualEventMainInformationDate';
import IndividualEventMainInformationPrivacyTag from './IndividualEventMainInformationPrivacyTag';
import IndividualEventMainInformationSummary from './IndividualEventMainInformationSummary';
import IndividualEventMainInformationTitle from './IndividualEventMainInformationTitle';

const IndividualEventMainInformation: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <div className="s-events-individual-header-content">
    <div>
      <IndividualEventMainInformationDate data={event} />
      <IndividualEventMainInformationTitle data={event} />
      <IndividualEventMainInformationCommunity data={event} />
      <IndividualEventMainInformationSummary data={event} />
      <IndividualEventMainInformationPrivacyTag data={event} />
    </div>

    <IndividualEventMainInformationButtonRow data={event} />
  </div>
);

IndividualEventMainInformation.fragment = gql`
  fragment IndividualEventMainInformationFragment on events {
    ...IndividualEventMainInformationButtonRowFragment
    ...IndividualEventMainInformationCommunityFragment
    ...IndividualEventMainInformationDateFragment
    ...IndividualEventMainInformationPrivacyTagFragment
    ...IndividualEventMainInformationSummaryFragment
    ...IndividualEventMainInformationTitleFragment
  }
  ${IndividualEventMainInformationButtonRow.fragment}
  ${IndividualEventMainInformationCommunity.fragment}
  ${IndividualEventMainInformationDate.fragment}
  ${IndividualEventMainInformationPrivacyTag.fragment}
  ${IndividualEventMainInformationSummary.fragment}
  ${IndividualEventMainInformationTitle.fragment}
`;

export default IndividualEventMainInformation;
