import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember
} from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import IdStore from '@store/Id.store';
import { sortObjects } from '@util/util';
import { MemberHistoryData } from './Profile.types';

export const useMemberHistory = (): MemberHistoryData[] => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const {
    community,
    eventAttendees,
    eventGuests,
    eventWatches,
    joinedAt
  } = useFindOne(IMember, {
    fields: [
      'community.id',
      'community.name',
      'eventAttendees.createdAt',
      'eventAttendees.id',
      'eventAttendees.event.title',
      'eventGuests.createdAt',
      'eventGuests.id',
      'eventGuests.event.title',
      'eventWatches.createdAt',
      'eventWatches.id',
      'eventWatches.event.title',
      'id',
      'firstName',
      'joinedAt'
    ],
    where: { id: memberId }
  });

  if (!eventAttendees && !eventGuests && !eventWatches) return [];

  const attendeeEvents: MemberHistoryData[] = eventWatches.map(
    (eventAttendee: IEventAttendee) => {
      return {
        date: eventAttendee.createdAt,
        event: `Attended Event`,
        title: eventAttendee.event.title
      };
    }
  );

  const guestEvents: MemberHistoryData[] = eventGuests.map(
    (eventGuest: IEventGuest) => {
      return {
        date: eventGuest.createdAt,
        event: `RSVP'd to Event`,
        title: eventGuest.event.title
      };
    }
  );

  const joinedAtEvents: MemberHistoryData[] = [
    {
      date: joinedAt,
      event: 'Joined Community',
      title: community.name
    }
  ];

  const watchEvents: MemberHistoryData[] = eventWatches.map(
    (eventWatch: IEventWatch) => {
      return {
        date: eventWatch.createdAt,
        event: `Viewed Event Recording`,
        title: eventWatch.event.title
      };
    }
  );

  return [
    ...attendeeEvents,
    ...guestEvents,
    ...joinedAtEvents,
    ...watchEvents
  ].sort((a: MemberHistoryData, b: MemberHistoryData) =>
    sortObjects(a, b, 'date')
  );
};
