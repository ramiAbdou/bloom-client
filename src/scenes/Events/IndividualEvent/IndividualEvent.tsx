import { ActionCreator } from 'easy-peasy';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Show from '@containers/Show';
import { EventPrivacy, IEvent } from '@db/db.entities';
import { SetActiveArgs } from '@db/db.types';
import useFindOne from '@gql/useFindOne';
import useFindOneFull from '@gql/useFindOneFull';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { ErrorContext } from '@util/constants.errors';
import { cx } from '@util/util';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventInsights from './IndividualEventInsights';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventTable from './IndividualEventTable';

const IndividualEventHeader: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event.id);

  const { imageUrl } = useFindOne(IEvent, {
    fields: ['imageUrl'],
    where: { id: eventId }
  });

  return (
    <div className="cg-md d-grid p-md s-events-individual-header">
      <EventsAspectBackground imageUrl={imageUrl} />
      <IndividualEventMain />
    </div>
  );
};

const IndividualEventContent: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event.id);
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const { privacy } = useFindOne(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isMembersOnly: boolean = privacy === EventPrivacy.MEMBERS_ONLY;
  const hasCookieError: boolean = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  // If not a member of the community, and it's a member's only
  // event or there was an issue logging in, show a locked modal.
  useEffect(() => {
    if (!isMember && (isMembersOnly || hasCookieError)) {
      showModal({
        id: ModalType.CHECK_IN,
        metadata: eventId,
        options: { lock: isMembersOnly }
      });
    }
  }, [hasCookieError, isMember, isMembersOnly]);

  const css: string = cx('', { 's-events-individual--public': !isMember });

  return (
    <div className={css}>
      <IndividualEventInsights />
      <IndividualEventHeader />
      <IndividualEventTable />

      <div className="cg-md d-grid p-md s-events-individual-grid">
        <IndividualEventAbout />
        <IndividualEventAttendeeList />
        <IndividualEventGuestList />
      </div>
    </div>
  );
};

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };

  const isEventActive: boolean = useStoreState(
    ({ db }) => db.event?.id === eventId
  );

  const setActiveEntities: ActionCreator<
    SetActiveArgs | SetActiveArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: [
      'community.id',
      'community.name',
      'community.primaryColor',
      'description',
      'endTime',
      'eventGuests.createdAt',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName',
      'id',
      'imageUrl',
      'privacy',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl'
    ],
    where: { id: eventId }
  });

  useEffect(() => {
    if (event) {
      setActiveEntities([
        { id: event.id, table: 'events' },
        { id: event.community.id, table: 'communities' }
      ]);
    }
  }, [event]);

  if (loading || !isEventActive) return null;

  return (
    <Show show={!loading && isEventActive}>
      <IndividualEventContent />
    </Show>
  );
};

export default IndividualEvent;
