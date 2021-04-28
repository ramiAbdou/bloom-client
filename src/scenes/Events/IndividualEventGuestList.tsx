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
import { IEvent, IEventGuest } from '@util/constants.entities';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from './Events.util';

const IndividualEventGuest: React.FC<IdProps> = ({ id: guestId }) => {
  const isMember: boolean = useIsMember();

  const { data: eventGuest, loading } = useFindOne(IEventGuest, {
    fields: [
      'member.firstName',
      'member.id',
      'member.lastName',
      'supporter.firstName',
      'supporter.id',
      'supporter.lastName'
    ],
    where: { id: guestId }
  });

  if (loading) return null;

  const firstName: string =
    eventGuest.member?.firstName ?? eventGuest.supporter?.firstName;

  const lastName: string =
    eventGuest.member?.lastName ?? eventGuest.supporter?.lastName;

  const fullName: string = `${firstName} ${lastName}`;

  const onClick = (): void => {
    if (isMember && eventGuest.member?.id) {
      modalVar({ id: ModalType.PROFILE, metadata: eventGuest.member?.id });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        // memberId={eventGuest.member?.id}
        size={36}
        // supporterId={eventGuest.supporter?.id}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['eventGuests.createdAt', 'eventGuests.id'],
    where: { id: eventId }
  });

  if (loading) return null;

  const sortedEventGuests: IdProps[] = event.eventGuests
    ?.sort((a: IEventGuest, b: IEventGuest) => sortObjects(a, b, 'createdAt'))
    ?.map((eventGuest: IEventGuest) => {
      return { id: eventGuest.id };
    });

  return (
    <>
      {!sortedEventGuests?.length && <p>No guests have RSVP'd yet.</p>}

      {/* <List
        className="s-events-card-ctr"
        items={sortedEventGuests}
        render={IndividualEventGuest}
      /> */}
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const guestsCount: number = event.eventGuests?.length;
  const hasEventFinished: boolean = getEventTiming(event) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={guestsCount ? `${guestsCount} Going` : null}
      show={!hasEventFinished}
      title="Guest List"
    >
      <IndividualEventGuestListContent />
    </Card>
  );
};

export default IndividualEventGuestList;
