import React from 'react';
import { useParams } from 'react-router-dom';

import { QueryResult } from '@hooks/useQuery.types';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventInsights from './IndividualEventInsights';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventTable from './IndividualEventTable';
import useInitIndividualEvent from './useInitIndividualEvent';
import useInitMembersOnlyIndividualEvent from './useInitMembersOnlyIndividualEvent';

const IndividualEventHeader: React.FC = () => {
  const imageUrl: string = useStoreState(({ db }) => db.event.imageUrl);

  return (
    <div className="cg-md d-grid p-md s-events-individual-header">
      <EventsAspectBackground imageUrl={imageUrl} />
      <IndividualEventMain />
    </div>
  );
};

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const isEventActive: boolean = useStoreState(
    ({ db }) => db.event?.id === eventId
  );

  const { loading }: Partial<QueryResult> = useInitIndividualEvent();
  useInitMembersOnlyIndividualEvent();

  if (loading || !isEventActive) return null;

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

export default IndividualEvent;
