import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import CheckInModal from '@modals/CheckIn/CheckIn';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { GET_EVENT, GetEventArgs } from '../Events.gql';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAnalytics from './IndividualEventAnalytics';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventPanel from './IndividualEventPanel';

const IndividualEventHeader: React.FC = () => (
  <div className="s-events-individual-header">
    <EventsAspectBackground />
    <IndividualEventMain />
  </div>
);

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };

  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const isEventActive = useStoreState(({ db }) => db.event?.id === eventId);
  const isMembersOnly = useStoreState(({ db }) => db.event?.private);
  const setActiveEvent = useStoreActions(({ db }) => db.setActiveEvent);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const { data, loading } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: {
      eventId,
      populate: [
        'attendees.member.data',
        'attendees.member.type',
        'attendees.member.user',
        'community.questions',
        'guests.member.data',
        'guests.member.type',
        'guests.member.user'
      ]
    }
  });

  useEffect(() => {
    if (data) {
      setActiveEvent(data.id);
      // @ts-ignore b/c type issues.
      setActiveCommunity(data.community?.id);
    }
  }, [data]);

  useEffect(() => {
    if (isMembersOnly && !isAuthenticated) {
      showModal(`${ModalType.CHECK_IN}-${eventId}`);
    }
  }, [isMembersOnly, isAuthenticated]);

  if (loading || !isEventActive) return null;

  const css = cx('', { 's-events-individual--public': !isAuthenticated });

  return (
    <div className={css}>
      <IndividualEventHeader />

      <div className="s-events-individual-grid">
        <IndividualEventAbout />
        <IndividualEventAttendeeList />
        <IndividualEventGuestList />
      </div>

      <IndividualEventAnalytics />
      <IndividualEventPanel id={eventId} />
      <CreateEventModal id={eventId} />
      <CheckInModal id={eventId} lock={isMembersOnly && !isAuthenticated} />
    </div>
  );
};

export default IndividualEvent;
