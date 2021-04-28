import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { communityIdVar, eventIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import useIsMember from '@hooks/useIsMember';
import { IEvent } from '@util/constants.entities';
import { cx } from '@util/util';
import IndividualEventInteractionsSection from './IndividualEventInteractionsSection';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventStatisticCardList from './IndividualEventStatisticCardList';
import useShowCheckInEventModal from './useShowCheckInEventModal';

interface GetEventByIdArgs {
  eventId: string;
}

interface GetEventByIdResult {
  event: IEvent;
}

const GET_EVENT_BY_ID: DocumentNode = gql`
  query GetEventById($eventId: String!) {
    event(id: $eventId) {
      id
      privacy
      ...IndividualEventMainFragment
      ...IndividualEventStatisticCardListFragment
      ...IndividualEventInteractionsSectionFragment

      community {
        id
      }
    }
  }
  ${IndividualEventMain.fragment}
  ${IndividualEventStatisticCardList.fragment}
  ${IndividualEventInteractionsSection.fragment}
`;

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };

  const { data, error, loading } = useQuery<
    GetEventByIdResult,
    GetEventByIdArgs
  >(GET_EVENT_BY_ID, { skip: !eventId, variables: { eventId } });

  const event: IEvent = data?.event;

  console.log(error);

  useEffect(() => {
    if (event?.id) {
      communityIdVar(event.community.id);
      eventIdVar(event.id);
    }
  }, [event]);

  const isEventActive: boolean = useReactiveVar(eventIdVar) === eventId;
  const isMember: boolean = useIsMember();

  // Once the event is loaded, depending on the status of the Member (whether
  // or not they are logged in and apart of the community), we may need to
  // show the CHECK_IN modal.
  useShowCheckInEventModal(event);

  if (loading || !isEventActive) return null;

  const css: string = cx('home-content', {
    's-events-individual--public': !isMember
  });

  return (
    <div className={css}>
      <IndividualEventStatisticCardList data={event} />
      <IndividualEventMain data={event} />
      <IndividualEventInteractionsSection data={event} />
      {/* 
      

      <div className="cg-md d-grid p-md s-events-individual-grid">
        <IndividualEventAbout />
        <IndividualEventAttendeeList />
        <IndividualEventGuestList />
      </div> */}
    </div>
  );
};

export default IndividualEvent;
