import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Card from '@components/containers/Card/Card';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import useFindOne from '@core/gql/hooks/useFindOne';
import { modalVar } from '@core/state/Modal.reactive';
import useIsMember from '@hooks/useIsMember';
import { IdProps, ModalType } from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

const IndividualEventAttendee: React.FC<IdProps> = ({ id: attendeeId }) => {
  const isMember: boolean = useIsMember();

  const { data: eventAttendee, loading } = useFindOne(IEventAttendee, {
    fields: [
      'member.firstName',
      'member.id',
      'member.lastName',
      'supporter.firstName',
      'supporter.id',
      'supporter.lastName'
    ],
    where: { id: attendeeId }
  });

  if (loading) return null;

  const firstName: string =
    eventAttendee.member?.firstName ?? eventAttendee.supporter?.firstName;

  const lastName: string =
    eventAttendee.member?.lastName ?? eventAttendee.supporter?.lastName;

  const fullName: string = `${firstName} ${lastName}`;

  const onClick = (): void => {
    if (isMember && eventAttendee.member?.id) {
      modalVar({ id: ModalType.PROFILE, metadata: eventAttendee.member?.id });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        memberId={eventAttendee.member?.id}
        size={36}
        supporterId={eventAttendee.supporter?.id}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['eventAttendees.createdAt', 'eventAttendees.id'],
    where: { id: eventId }
  });

  if (loading) return null;

  const sortedEventAttendees: IdProps[] = event.eventAttendees
    ?.sort((a: IEventAttendee, b: IEventAttendee) =>
      sortObjects(a, b, 'createdAt')
    )
    ?.map((eventAttendee: IEventAttendee) => {
      return { id: eventAttendee.id };
    });

  return (
    <>
      {!sortedEventAttendees?.length && <p>No guests attended.</p>}

      {/* <List
        className="s-events-card-ctr"
        items={sortedEventAttendees}
        render={IndividualEventAttendee}
      /> */}
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const attendeesCount: number = event.eventAttendees?.length;
  const hasEventFinished: boolean = getEventTiming(event) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={attendeesCount ? `${attendeesCount} Attended` : null}
      show={hasEventFinished}
      title="Attendees"
    >
      <IndividualEventAttendeeListContent />
    </Card>
  );
};

export default IndividualEventGuestList;
