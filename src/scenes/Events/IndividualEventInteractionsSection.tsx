import React from 'react';

import { gql } from '@apollo/client';
import Section from '@components/containers/Section';
import useMemberRole from '@core/hooks/useMemberRole';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';
import IndividualEventInteractionsTable from './IndividualEventInteractionsTable';

const IndividualEventInteractionsSection: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const role: MemberRole = useMemberRole();

  const hasEventContent: boolean =
    !!event.eventAttendeesAggregate.aggregate.count ||
    !!event.eventGuestsAggregate.aggregate.count ||
    !!event.eventWatchesAggregate.aggregate.count;

  if (!role || !hasEventContent) return null;

  return (
    <Section className="s-events-individual-table-ctr">
      <IndividualEventInteractionsTable data={event} />
    </Section>
  );
};

IndividualEventInteractionsSection.fragment = gql`
  fragment IndividualEventInteractionsSectionFragment on events {
    eventAttendeesAggregate: eventAttendees_aggregate {
      aggregate {
        count
      }
    }

    eventGuestsAggregate: eventGuests_aggregate {
      aggregate {
        count
      }
    }

    eventWatchesAggregate: eventWatches_aggregate {
      aggregate {
        count
      }
    }

    ...IndividualEventInteractionsTableFragment
  }
  ${IndividualEventInteractionsTable.fragment}
`;

export default IndividualEventInteractionsSection;
