export type MemberHistoryEvent =
  | 'Attended Event'
  | 'Joined Community'
  | 'Paid Dues'
  | `RSVP'd to Event`
  | 'Viewed Event Recording';

export interface MemberHistoryData {
  date: string;
  event: MemberHistoryEvent;
  title?: string;
}
