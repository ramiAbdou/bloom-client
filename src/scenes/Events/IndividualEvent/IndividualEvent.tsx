import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { CookieType, ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import CheckInModal from '@modals/CheckIn/CheckIn';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import Loader from '@molecules/Loader/Loader';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import {
  GET_EVENT,
  GET_EVENT_ATTENDEES,
  GET_EVENT_GUESTS,
  GET_EVENT_WATCHES,
  GetEventArgs
} from '../Events.gql';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventInsights from './IndividualEventInsights';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventPanel from './IndividualEventPanel';
import IndividualEventTable from './IndividualEventTable';

const IndividualEventHeader: React.FC = () => {
  const imageUrl = useStoreState(({ db }) => db.event?.imageUrl);

  return (
    <div className="s-events-individual-header">
      <EventsAspectBackground imageUrl={imageUrl} />
      <IndividualEventMain />
    </div>
  );
};

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };

  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const isEventActive = useStoreState(({ db }) => db.event?.id === eventId);
  const isMembersOnly = useStoreState(({ db }) => db.event?.private);
  const setActiveEvent = useStoreActions(({ db }) => db.setActiveEvent);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const { data: data1, error } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  const { data: data2 } = useQuery<IEvent, GetEventArgs>({
    name: 'getEventGuests',
    query: GET_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST],
    variables: { eventId }
  });

  const { data: data3 } = useQuery<IEvent, GetEventArgs>({
    name: 'getEventAttendees',
    query: GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    variables: { eventId }
  });

  const { data: data4 } = useQuery<IEvent, GetEventArgs>({
    name: 'getEventWatches',
    query: GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    variables: { eventId }
  });

  const loading = !data1 && !data2 && !data3 && !data4;

  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useEffect(() => {
    if (data1) {
      setActiveEvent(data1.id);
      // @ts-ignore b/c type issues.
      setActiveCommunity(data1.community?.id);
    }
  }, [data1]);

  useEffect(() => {
    if (!isAuthenticated && (isMembersOnly || hasCookieError)) {
      showModal(`${ModalType.CHECK_IN}-${eventId}`);
    }
  }, [hasCookieError, isMembersOnly, isAuthenticated]);

  if (error && !isAuthenticated) return <Redirect to="/login" />;
  if (loading) return <Loader />;
  if (!isEventActive) return null;

  const css = cx('', { 's-events-individual--public': !isAuthenticated });

  return (
    <div className={css}>
      <IndividualEventInsights />
      <IndividualEventHeader />
      <IndividualEventTable />

      <div className="s-events-individual-grid">
        <IndividualEventAbout />
        <IndividualEventAttendeeList />
        <IndividualEventGuestList />
      </div>

      <IndividualEventPanel id={eventId} />
      <CreateEventModal id={eventId} />
      <CheckInModal id={eventId} lock={isMembersOnly && !isAuthenticated} />
    </div>
  );
};

export default IndividualEvent;
