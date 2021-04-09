import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { IEvent, IEventAttendee } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { ModalData } from '@organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

const IndividualEventAttendee: React.FC<IdProps> = ({ id: attendeeId }) => {
  const isMember: boolean = useIsMember();

  const { member, supporter }: IEventAttendee = useFindOne(IEventAttendee, {
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

  const firstName: string = member?.firstName ?? supporter?.firstName;
  const lastName: string = member?.lastName ?? supporter?.lastName;
  const fullName: string = `${firstName} ${lastName}`;

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    if (isMember && member?.id) {
      showModal({ id: ModalType.PROFILE, metadata: member?.id });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        memberId={member?.id}
        size={36}
        supporterId={supporter?.id}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { eventAttendees }: IEvent = useFindOne(IEvent, {
    fields: ['eventAttendees.createdAt', 'eventAttendees.id'],
    where: { id: eventId }
  });

  const sortedEventAttendees: IdProps[] = eventAttendees
    ?.sort((a: IEventAttendee, b: IEventAttendee) =>
      sortObjects(a, b, 'createdAt')
    )
    ?.map((eventAttendee: IEventAttendee) => {
      return { id: eventAttendee.id };
    });

  return (
    <>
      {!sortedEventAttendees?.length && <p>No guests attended.</p>}

      <List
        className="s-events-card-ctr"
        items={sortedEventAttendees}
        render={IndividualEventAttendee}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, eventAttendees, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { id: eventId }
  });

  const attendeesCount: number = eventAttendees?.length;

  const hasEventFinished: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={attendeesCount ? `${attendeesCount} Attended` : null}
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
