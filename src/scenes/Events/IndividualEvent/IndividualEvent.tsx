import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { CookieType, ModalType } from '@constants';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import CheckInModal from '@modals/CheckIn/CheckIn';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import Loader from '@molecules/Loader/Loader';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { GET_EVENT, GetEventArgs } from '../Events.gql';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventInsights from './IndividualEventInsights';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventPanel from './IndividualEventPanel';
import IndividualEventTable from './IndividualEventTable';

const IndividualEventHeader: React.FC = () => (
  <div className="s-events-individual-header">
    <IndividualEventInsights />

    <Row>
      <EventsAspectBackground />
      <IndividualEventMain />
    </Row>
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

  const { data, error, loading } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: {
      eventId,
      populate: [
        'attendees.member.data',
        'attendees.member.type',
        'attendees.member.user',
        'community.owner.user',
        'community.questions',
        'guests.member.data',
        'guests.member.type',
        'guests.member.user',
        'watches.member.data',
        'watches.member.type',
        'watches.member.user'
      ]
    }
  });

  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useEffect(() => {
    if (data) {
      setActiveEvent(data.id);
      // @ts-ignore b/c type issues.
      setActiveCommunity(data.community?.id);
    }
  }, [data]);

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
