import day from 'dayjs';
import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { HeaderTag } from '@atoms/Tags';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import { useStoreActions, useStoreState } from '@store/Store';
import IndividualEventActions from './IndividualEventActions';

const IndividualEventMainHeaderContainer: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const eventId = useStoreState(({ db }) => db.event?.id);
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const hasPast = useStoreState(({ db }) => {
    return day.utc().isAfter(db.event.startTime);
  });

  const onClick = () => showModal(`${ModalType.CREATE_EVENT}-${eventId}`);
  const startDay = day(startTime).format('dddd, MMMM Do');
  const startHour = day(startTime).format('h:mm A');
  const endHour = day(endTime).format('h:mm A z');

  return (
    <Row spaceBetween className="s-events-individual-header-date">
      <div>
        <h4>{startDay}</h4>
        <p className="meta">{`${startHour} - ${endHour}`}</p>
      </div>

      <Button tertiary show={!hasPast && isAdmin} onClick={onClick}>
        Edit
        <IoCreateOutline />
      </Button>
    </Row>
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
