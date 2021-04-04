import { State } from 'easy-peasy';

import {
  ICommunity,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberType,
  IPayment
} from '@db/Db.entities';
import { DbModel } from '@db/Db.types';
import { sortObjects } from '@util/util';
import { MemberHistoryData } from './Profile.types';

interface GetMemberHistoryArgs {
  db: State<DbModel>;
  memberId: string;
}

export const getMemberHistory = ({
  db,
  memberId
}: GetMemberHistoryArgs): MemberHistoryData[] => {
  const member: IMember = db.byMemberId[memberId];
  const community: ICommunity = db.byCommunityId[member?.community];

  const attendeeEvents: MemberHistoryData[] =
    member.eventAttendees?.map((attendeeId: string) => {
      const eventAttendee: IEventAttendee = db.byEventAttendeeId[attendeeId];
      const event: IEvent = db.byEventId[eventAttendee?.event];

      return {
        date: eventAttendee.createdAt,
        event: 'Attended Event',
        title: event.title
      };
    }) ?? [];

  const guestEvents: MemberHistoryData[] =
    member.eventGuests?.map((guestId: string) => {
      const guest: IEventGuest = db.byEventGuestId[guestId];
      const event: IEvent = db.byEventId[guest?.event];

      return {
        date: guest.createdAt,
        event: `RSVP'd to Event`,
        title: event.title
      };
    }) ?? [];

  const joinedAtEvents: MemberHistoryData[] = [
    { date: member.joinedAt, event: 'Joined Community', title: community?.name }
  ];

  const paymentEvents: MemberHistoryData[] =
    member.payments?.map((paymentId: string) => {
      const payment: IPayment = db.byPaymentId[paymentId];
      const type: IMemberType = db.byMemberTypeId[payment?.memberType];

      return {
        date: payment.createdAt,
        event: `Paid Dues`,
        title: `${type.name}, $${payment.amount}`
      };
    }) ?? [];

  const watchEvents: MemberHistoryData[] =
    member.eventWatches?.map((watchId: string) => {
      const eventWatch: IEventWatch = db.byEventWatchId[watchId];
      const event: IEvent = db.byEventId[eventWatch?.event];

      return {
        date: eventWatch.createdAt,
        event: `Viewed Event Recording`,
        title: event.title
      };
    }) ?? [];

  return [
    ...attendeeEvents,
    ...guestEvents,
    ...joinedAtEvents,
    ...paymentEvents,
    ...watchEvents
  ].sort((a: MemberHistoryData, b: MemberHistoryData) =>
    sortObjects(a, b, 'date')
  );
};
