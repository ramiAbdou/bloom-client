import { State } from 'easy-peasy';

import { DbModel } from '@store/Db/Db.types';
import {
  ICommunity,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberPlan,
  IPayment
} from '@store/Db/entities';
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
    member.attendees?.map((attendeeId: string) => {
      const attendee: IEventAttendee = db.byAttendeeId[attendeeId];
      const event: IEvent = db.byEventId[attendee?.event];

      return {
        date: attendee.createdAt,
        event: 'Attended Event',
        title: event.title
      };
    }) ?? [];

  const guestEvents: MemberHistoryData[] =
    member.guests?.map((guestId: string) => {
      const guest: IEventGuest = db.byGuestId[guestId];
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
      const type: IMemberPlan = db.byMemberPlanId[payment?.plan];

      return {
        date: payment.createdAt,
        event: `Paid Dues`,
        title: `${type.name}, $${payment.amount}`
      };
    }) ?? [];

  const watchEvents: MemberHistoryData[] =
    member.watches?.map((watchId: string) => {
      const watch: IEventWatch = db.byWatchId[watchId];
      const event: IEvent = db.byEventId[watch?.event];

      return {
        date: watch.createdAt,
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
