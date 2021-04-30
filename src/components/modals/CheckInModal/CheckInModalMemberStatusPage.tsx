import React from 'react';

import { gql } from '@apollo/client';
import FormLabel from '@components/organisms/Form/FormLabel';
import StoryPage from '@components/organisms/Story/StoryPage';
import {
  ComponentWithData,
  ComponentWithFragments,
  ShowProps
} from '@util/constants';
import { IEvent } from '@util/constants.entities';
import CheckInModalMemberStatusPageButtonRow from './CheckInModalMemberStatusPageButtonRow';

const CheckInModalMemberStatusPageFormLabel: ComponentWithData<IEvent> = ({
  data: event
}) => {
  const label: string = `Are you a member of ${event.community.name}?`;
  return <FormLabel marginBottom={16}>{label}</FormLabel>;
};

const CheckInModalMemberStatusPage: ComponentWithFragments<
  IEvent,
  ShowProps
> = ({ data: event }) => (
  <StoryPage
    description="This event records attendance, please check-in to continue."
    id="CHECK_IN_MEMBER_STATUS"
    title="Check In"
  >
    <CheckInModalMemberStatusPageFormLabel data={event} />
    <CheckInModalMemberStatusPageButtonRow data={event} />
  </StoryPage>
);

CheckInModalMemberStatusPage.fragment = gql`
  fragment CheckInModalMemberStatusPageFragment on events {
    ...CheckInModalMemberStatusPageButtonRowFragment

    community {
      name
    }
  }
  ${CheckInModalMemberStatusPageButtonRow.fragment}
`;

export default CheckInModalMemberStatusPage;
