import React from 'react';

import Separator from '@components/atoms/Separator';
import GrayCard from '@components/containers/Card/GrayCard';
import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import SidebarHamburgerButton from '@components/organisms/Sidebar/SidebarHamburgerButton';
import { IEvent, IMember } from '@core/db/db.entities';
import useFindOneFull from '@core/gql/hooks/useFindOneFull';
import { useStoreState } from '@core/store/Store';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';

const IndividualEventInsightsAttendeesCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const attendeesCount: number = event.eventAttendees?.length;
  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  return (
    <GrayCard
      label="# of Attendees"
      show={!isUpcoming}
      value={attendeesCount ?? 0}
    />
  );
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const guestsCount: number = event.eventGuests?.length ?? 0;
  return <GrayCard label="# of RSVPs" value={guestsCount} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: ['eventWatches.id', 'recordingUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  const watchesCount: number = event.eventWatches?.length;

  return (
    <GrayCard
      label="# of Recording Viewers"
      show={!!event.recordingUrl}
      value={watchesCount ?? 0}
    />
  );
};

const IndividualEventInsights: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

  return (
    <Section className="s-events-individual-insights" show={!!member.role}>
      <SidebarHamburgerButton />

      <Row spacing="sm">
        <IndividualEventInsightsAttendeesCard />
        <IndividualEventInsightsGuestsCard />
        <IndividualEventInsightsWatchesCard />
      </Row>

      <Separator marginBottom={0} marginTop={24} />
    </Section>
  );
};

export default IndividualEventInsights;
