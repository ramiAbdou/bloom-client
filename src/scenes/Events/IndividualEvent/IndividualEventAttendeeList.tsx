import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import ProfilePicture from '@molecules/ProfilePicture';
import { IEventAttendee, IMember, IUser } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

interface IndividualEventAttendeeProps
  extends Pick<IUser, 'firstName' | 'id' | 'lastName' | 'pictureUrl'> {
  memberId: string;
}

const IndividualEventAttendee: React.FC<IndividualEventAttendeeProps> = (
  props
) => {
  const { firstName, lastName, memberId, pictureUrl } = props;
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);
  const fullName = `${firstName} ${lastName}`;

  return (
    <Button className="s-events-individual-member" onClick={onClick}>
      <ProfilePicture
        circle
        fontSize={16}
        href={pictureUrl}
        size={36}
        {...props}
      />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const users: IndividualEventAttendeeProps[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    return db.event?.attendees
      ?.map((attendeeId: string) => byAttendeeId[attendeeId])
      ?.sort((a, b) => sortObjects(a, b, 'createdAt', 'DESC'))
      ?.map((attendee: IEventAttendee) => byMemberId[attendee.member])
      ?.map((member: IMember) => ({
        ...byUserId[member.user],
        memberId: member.id
      }));
  });

  return (
    <>
      {!users?.length && <p>No guests have RSVP'd yet.</p>}

      <div>
        {users?.map((user: IndividualEventAttendeeProps) => {
          return (
            <React.Fragment key={user?.id}>
              <IndividualEventAttendee key={user?.id} {...user} />
              <MemberProfileModal memberId={user?.memberId} userId={user?.id} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const numAttendees = useStoreState(({ db }) => db.event?.attendees?.length);

  if (day.utc().isBefore(day.utc(endTime))) return null;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numAttendees ? `${numAttendees} Attended` : null}
      title="Attendees"
    >
      <IndividualEventAttendeeListContent />
    </Card>
  );
};

export default IndividualEventGuestList;
