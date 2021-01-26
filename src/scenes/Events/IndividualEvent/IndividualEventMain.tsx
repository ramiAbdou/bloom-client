import day from 'dayjs';
import React from 'react';

import { HeaderTag } from '@atoms/Tags';
import { useStoreState } from '@store/Store';
import IndividualEventActions from './IndividualEventActions';

const IndividualEventMainHeaderContainer: React.FC = () => {
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const startTime = useStoreState(({ db }) => db.event?.startTime);

  const startDay = day(startTime).format('dddd, MMMM Do');
  const startHour = day(startTime).format('h:mm A');
  const endHour = day(endTime).format('h:mm A z');

  return (
    <div className="s-events-individual-header-date">
      <h4>{startDay}</h4>
      <h4>{`${startHour} - ${endHour}`}</h4>
    </div>
  );
};

const IndividualEventMain: React.FC = () => {
  const isPrivate = useStoreState(({ db }) => db.event?.private);
  const summary = useStoreState(({ db }) => db.event?.summary);
  const title = useStoreState(({ db }) => db.event?.title);

  return (
    <div className="s-events-individual-header-content">
      <div>
        <IndividualEventMainHeaderContainer />
        <h1>{title}</h1>
        <p>{summary}</p>
        <HeaderTag>{isPrivate ? 'Members Only' : 'Open to All'} </HeaderTag>
      </div>

      <IndividualEventActions />
    </div>
  );
};

export default IndividualEventMain;
