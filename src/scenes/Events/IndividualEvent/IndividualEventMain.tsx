import day from 'dayjs';
import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import { EventPrivacy, IEvent } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import { useStoreState } from '@store/Store';
import IndividualEventActions from './IndividualEventActions';

const IndividualEventMainHeaderContainer: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  const startDay: string = day(startTime).format('dddd, MMMM Do');
  const startHour: string = day(startTime).format('h:mm A');
  const endHour: string = day(endTime).format('h:mm A z');

  return (
    <div className="s-events-individual-header-date">
      <h4>{startDay}</h4>
      <h4>{`${startHour} - ${endHour}`}</h4>
    </div>
  );
};

const IndividualEventMain: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);
  const isMember: boolean = useIsMember();

  const { community, privacy, summary, title } = useFindOne(IEvent, {
    fields: ['community.id', 'community.name', 'privacy', 'summary', 'title'],
    where: { id: eventId }
  });

  return (
    <div className="s-events-individual-header-content">
      <div>
        <IndividualEventMainHeaderContainer />
        <h1>{title}</h1>
        {!isMember && <p className="meta">Hosted by {community.name}</p>}
        {summary && <p>{summary}</p>}
        <HeaderTag>
          {privacy === EventPrivacy.MEMBERS_ONLY
            ? 'Members Only'
            : 'Open to All'}{' '}
        </HeaderTag>
      </div>

      <IndividualEventActions />
    </div>
  );
};

export default IndividualEventMain;
