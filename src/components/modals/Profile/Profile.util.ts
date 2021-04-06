import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember
} from '@db/db.entities';
import { GQL } from '@gql/gql.types';
import { sortObjects } from '@util/util';
import { MemberHistoryData } from './Profile.types';

interface GetMemberHistoryArgs {
  gql: GQL;
  memberId: string;
}

export const getMemberHistory = ({
  gql,
  memberId
}: GetMemberHistoryArgs): MemberHistoryData[] => {
  const member: IMember = gql.members.fromCache({
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
    id: memberId
  });

  if (!member) return [];

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
    // ...paymentEvents,
    ...watchEvents
  ].sort((a: MemberHistoryData, b: MemberHistoryData) =>
    sortObjects(a, b, 'date')
  );
};
