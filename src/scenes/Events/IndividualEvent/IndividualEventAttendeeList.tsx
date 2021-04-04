import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { ModalData } from '@organisms/Modal/Modal.types';
import { IEventAttendee, IMember, ISupporter } from '@db/db.entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

const IndividualEventAttendee: React.FC<IdProps> = ({ id: attendeeId }) => {
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const memberId: string = useStoreState(({ db }) => {
    const eventAttendee: IEventAttendee = db.byEventAttendeeId[attendeeId];
    return eventAttendee?.member;
  });

  const supporterId: string = useStoreState(({ db }) => {
    const eventAttendee: IEventAttendee = db.byEventAttendeeId[attendeeId];
    return eventAttendee?.supporter;
  });

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const supporter: ISupporter = db.bySupporterId[supporterId];

    const firstName: string = member?.firstName ?? supporter?.firstName;
    const lastName: string = member?.lastName ?? supporter?.lastName;

    return `${firstName} ${lastName}`;
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    if (isMember && memberId) {
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        memberId={memberId}
        size={36}
        supporterId={supporterId}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const attendees: IdProps[] = useStoreState(({ db }) =>
    db.event?.eventAttendees
      ?.map((attendeeId: string) => db.byEventAttendeeId[attendeeId])
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'))
      ?.map((eventAttendee: IEventAttendee) => {
        return { id: eventAttendee.id };
      })
  );

  return (
    <>
      {!attendees?.length && <p>No guests attended.</p>}

      <List
        className="s-events-card-ctr"
        items={attendees}
        render={IndividualEventAttendee}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);

  const numAttendees: number = useStoreState(
    ({ db }) => db.event?.eventAttendees?.length
  );

  const hasEventFinished: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numAttendees ? `${numAttendees} Attended` : null}
      show={hasEventFinished}
      title="Attendees"
    >
      <ListStore.Provider>
        <IndividualEventAttendeeListContent />
      </ListStore.Provider>
    </Card>
  );
};

export default IndividualEventGuestList;
