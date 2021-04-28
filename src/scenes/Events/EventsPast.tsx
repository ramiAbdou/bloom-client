import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Scene from '@components/containers/Scene';
import Section from '@components/containers/Section';
import { IEvent } from '@util/constants.entities';
import { now } from '@util/util';
import EventsCard from './EventsCard';
import EventsHeader from './EventsHeader';
import EventsPastList from './EventsPastList';
import EventsPastSearchBar from './EventsPastSearchBar';
import EventsPastYourList from './EventsPastYourList';

interface GetEventsPastByCommunityIdArgs {
  currentTimestamp: string;
}

interface GetEventsPastByCommunityIdResult {
  eventsPastSearchString: string;
  otherEvents: IEvent[];
  yourEvents: IEvent[];
}

const GET_EVENTS_PAST_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetEventsPastByCommunityId(
    $communityId: String!
    $currentTimestamp: String!
    $isUpcoming: Boolean! = false
    $memberId: String!
    $searchString: String!
  ) {
    communityId @client @export(as: "communityId")
    memberId @client @export(as: "memberId")
    eventsPastSearchString @client @export(as: "searchString")

    otherEvents: events(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        endTime: { _lt: $currentTimestamp }
        _or: [
          { summary: { _ilike: $searchString } }
          { title: { _ilike: $searchString } }
        ]
      }
      order_by: { endTime: desc }
    ) {
      id
      ...EventsCardFragment
    }

    yourEvents: events(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        endTime: { _lt: $currentTimestamp }
        eventAttendees: { memberId: { _eq: $memberId } }
      }
      order_by: { endTime: desc }
    ) {
      id
      ...EventsCardFragment
    }
  }
  ${EventsCard.fragment}
`;

const EventsPast: React.FC = () => {
  const { data, loading } = useQuery<
    GetEventsPastByCommunityIdResult,
    GetEventsPastByCommunityIdArgs
  >(GET_EVENTS_PAST_BY_COMMUNITY_ID, {
    variables: { currentTimestamp: now() }
  });

  const otherEvents: IEvent[] = data?.otherEvents;
  const yourEvents: IEvent[] = data?.yourEvents;

  return (
    <Scene>
      <EventsHeader loading={loading} />

      {!!yourEvents?.length && (
        <Section>
          <h2 className="mb-sm">Events You've Attended</h2>
          {yourEvents && <EventsPastYourList {...data} />}
        </Section>
      )}

      <Section>
        <h2 className="mb-sm">Past Events</h2>
        <EventsPastSearchBar />
        {otherEvents && <EventsPastList {...data} />}
      </Section>
    </Scene>
  );
};

export default EventsPast;
