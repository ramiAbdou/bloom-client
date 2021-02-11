import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { CookieType, ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { GET_EVENT, GET_EVENT_GUESTS, GetEventArgs } from '../Events.gql';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventInsights from './IndividualEventInsights';
import IndividualEventMain from './IndividualEventMain';
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
  const setActive = useStoreActions(({ db }) => db.setActive);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: data1, loading: loading1, error } = useQuery<
    IEvent,
    GetEventArgs
  >({
    operation: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  const { loading: loading2 } = useQuery<IEvent, GetEventArgs>({
    operation: 'getEventGuests',
    query: GET_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST],
    variables: { eventId }
  });

  const loading = loading1 || loading2;
  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useLoader(loading);

  useEffect(() => {
    if (data1) {
      setActive({ id: data1.id, table: 'events' });
      // @ts-ignore b/c type issues.
      setActive({ id: data1.community?.id, table: 'communities' });
    }
  }, [data1]);

  useEffect(() => {
    if (!isAuthenticated && (isMembersOnly || hasCookieError)) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
    }
  }, [hasCookieError, isMembersOnly, isAuthenticated]);

  if (error && !isAuthenticated) return <Redirect to="/login" />;
  if (loading || !isEventActive) return null;

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
    </div>
  );
};

export default IndividualEvent;
