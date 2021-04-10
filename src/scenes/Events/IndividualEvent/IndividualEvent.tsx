import { ActionCreator } from 'easy-peasy';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Show from '@components/containers/Show';
import { EventPrivacy, IEvent } from '@core/db/db.entities';
import { SetActiveEntitesArgs } from '@core/db/db.types';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import useIsMember from '@hooks/useIsMember';
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
  const eventId: string = useStoreState(({ db }) => db.eventId);

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
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { privacy } = useFindOne(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isMember: boolean = useIsMember();
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
    ({ db }) => db.eventId === eventId
  );

  const setActiveEntities: ActionCreator<
    SetActiveEntitesArgs | SetActiveEntitesArgs[]
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
    if (event.id) {
      setActiveEntities({
        communityId: event.community.id,
        eventId: event.id
      });
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
