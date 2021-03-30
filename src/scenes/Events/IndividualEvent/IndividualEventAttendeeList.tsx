import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEventAttendee, IMember, ISupporter } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

interface IndividualEventAttendeeProps {
  attendeeId?: string;
}

const IndividualEventAttendee: React.FC<IndividualEventAttendeeProps> = (
  props
) => {
  const { attendeeId } = props;

  const memberId: string = useStoreState(({ db }) => {
    const guest: IEventAttendee = db.byAttendeeId[attendeeId];
    return guest?.member;
  });

  const fullName: string = useStoreState(({ db }) => {
    const guest: IEventAttendee = db.byAttendeeId[attendeeId];
    const member: IMember = db.byMemberId[guest?.member];
    const supporter: ISupporter = db.bySupporterId[guest?.supporter];
    const firstName: string = member?.firstName ?? supporter?.firstName;
    const lastName: string = member?.lastName ?? supporter?.lastName;
    return `${firstName} ${lastName}`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.PROFILE, metadata: memberId });
  };

  return (
    <Button className="s-events-individual-member" onClick={onClick}>
      <ProfilePicture fontSize={16} memberId={memberId} size={36} />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const attendees: IndividualEventAttendeeProps[] = useStoreState(({ db }) =>
    db.event?.attendees
      ?.map((attendeeId: string) => db.byAttendeeId[attendeeId])
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'))
      ?.reduce(
        (acc, attendee: IEventAttendee) => [
          ...acc,
          { attendeeId: attendee.id }
        ],
        []
      )
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
    ({ db }) => db.event?.attendees?.length
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
