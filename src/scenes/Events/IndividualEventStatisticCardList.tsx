import React from 'react';

import { gql } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import SidebarHamburgerButton from '@components/organisms/Sidebar/SidebarHamburgerButton';
import useMemberRole from '@core/hooks/useMemberRole';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';
import IndividualEventAttendeesCard from './IndividualEventAttendeesCard';
import IndividualEventGuestsCard from './IndividualEventGuestsCard';
import IndividualEventWatchesCard from './IndividualEventWatchesCard';

const IndividualEventStatisticCardList: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const role: MemberRole = useMemberRole();

  if (!role) return null;

  return (
    <Section className="s-events-individual-insights">
      <SidebarHamburgerButton />

      <Row spacing="sm">
        <IndividualEventAttendeesCard data={event} />
        <IndividualEventGuestsCard data={event} />
        <IndividualEventWatchesCard data={event} />
      </Row>

      <Separator marginBottom={0} marginTop={24} />
    </Section>
  );
};

IndividualEventStatisticCardList.fragment = gql`
  fragment IndividualEventStatisticCardListFragment on events {
    ...IndividualEventAttendeesCardFragment
    ...IndividualEventGuestsCardFragment
    ...IndividualEventWatchesCardFragment
  }
  ${IndividualEventAttendeesCard.fragment}
  ${IndividualEventGuestsCard.fragment}
  ${IndividualEventWatchesCard.fragment}
`;

export default IndividualEventStatisticCardList;
