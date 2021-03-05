import day from 'dayjs';
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

    const firstName = member?.firstName ?? supporter?.firstName;
    const lastName = member?.lastName ?? supporter?.lastName;
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
  const users: IndividualEventAttendeeProps[] = useStoreState(({ db }) => {
    return db.event?.attendees
      ?.map((attendeeId: string) => db.byAttendeeId[attendeeId])
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'))
      ?.reduce((acc, attendee: IEventAttendee) => {
        if (attendee.member) {
          const member: IMember = db.byMemberId[attendee.member];
          return [...acc, { memberId: member.id, userId: member.user }];
        }

        return [...acc, { attendeeId: attendee.id }];
      }, []);
  });

  return (
    <>
      {!users?.length && <p>No guests attended.</p>}

      <List
        className="s-events-card-ctr"
        items={users}
        render={IndividualEventAttendee}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const numAttendees = useStoreState(({ db }) => db.event?.attendees?.length);

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numAttendees ? `${numAttendees} Attended` : null}
      show={day().isAfter(day(endTime))}
      title="Attendees"
    >
      <ListStore.Provider>
        <IndividualEventAttendeeListContent />
      </ListStore.Provider>
    </Card>
  );
};

export default IndividualEventGuestList;
