import day from 'dayjs';
import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { HeaderTag } from '@atoms/Tags';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import { useStoreActions, useStoreState } from '@store/Store';
import IndividualEventActions from './IndividualEventActions';

const IndividualEventHeaderDateContainer: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const eventId = useStoreState(({ db }) => db.event?.id);

  const hasPast = useStoreState(({ db }) => {
    return day.utc().isAfter(db.event.startTime);
  });

  const onClick = () => showModal(`${ModalType.CREATE_EVENT}-${eventId}`);

  return (
    <Row spaceBetween className="s-events-individual-header-date">
      <div>
        <h4>Saturday, January 21st</h4>
        <p className="meta">11:00 AM - 12:30 PM EST</p>
      </div>

      <Button tertiary show={!hasPast} onClick={onClick}>
        Edit
        <IoCreateOutline />
      </Button>
    </Row>
  );
};

const IndividualEventHeaderContent: React.FC = () => {
  const isPrivate = useStoreState(({ db }) => db.event?.private);
  const title = useStoreState(({ db }) => db.event?.title);

  return (
    <div className="s-events-individual-header-content">
      <div>
        <IndividualEventHeaderDateContainer />
        <h1>{title}</h1>
        <HeaderTag>{isPrivate ? 'Members Only' : 'Open to All'} </HeaderTag>
      </div>

      <IndividualEventActions />
    </div>
  );
};

const IndividualEventHeader: React.FC = () => {
  return (
    <div className="s-events-individual-header">
      <div>
        <div />
      </div>
      <IndividualEventHeaderContent />
    </div>
  );
};

export default IndividualEventHeader;
