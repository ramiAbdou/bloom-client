import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember
} from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { sortObjects } from '@util/util';
import { MemberHistoryData } from './Profile.types';

export const useMemberHistory = (): MemberHistoryData[] => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data: member, loading } = useFindOneFull(IMember, {
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

  if (
    loading ||
    (!member.eventAttendees && !member.eventGuests && !member.eventWatches)
  ) {
    return [];
  }

  const attendeeEvents: MemberHistoryData[] = member.eventWatches.map(
    (eventAttendee: IEventAttendee) => {
      return {
        date: eventAttendee.createdAt,
        event: `Attended Event`,
        title: eventAttendee.event.title
      };
    }
  );

  const guestEvents: MemberHistoryData[] = member.eventGuests.map(
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
      date: member.joinedAt,
      event: 'Joined Community',
      title: member.community.name
    }
  ];

  const watchEvents: MemberHistoryData[] = member.eventWatches.map(
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
