import day from 'dayjs';
import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import IndividualEventActions from './IndividualEventActions';

const IndividualEventMainHeaderContainer: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const startDay: string = day(event.startTime).format('dddd, MMMM Do');
  const startHour: string = day(event.startTime).format('h:mm A');
  const endHour: string = day(event.endTime).format('h:mm A z');

  return (
    <div className="s-events-individual-header-date">
      <h4>{startDay}</h4>
      <h4>{`${startHour} - ${endHour}`}</h4>
    </div>
  );
};

const IndividualEventMain: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);
  const isMember: boolean = useIsMember();

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['community.id', 'community.name', 'privacy', 'summary', 'title'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <div className="s-events-individual-header-content">
      <div>
        <IndividualEventMainHeaderContainer />
        <h1>{event.title}</h1>
        {!isMember && <p className="meta">Hosted by {event.community.name}</p>}
        {event.summary && <p>{event.summary}</p>}
        <HeaderTag>
          {event.privacy === EventPrivacy.MEMBERS_ONLY
            ? 'Members Only'
            : 'Open to All'}{' '}
        </HeaderTag>
      </div>

      <IndividualEventActions />
    </div>
  );
};

export default IndividualEventMain;
