import day from 'dayjs';
import React from 'react';

import Row from '@components/containers/Row/Row';

export type ProfileModalHistoryEventType =
  | 'Attended Event'
  | 'Joined Community'
  | 'Paid Dues'
  | `RSVP'd to Event`
  | 'Viewed Event Recording';

export interface ProfileModalHistoryEventData {
  date: string;
  event: ProfileModalHistoryEventType;
  title?: string;
}

const ProfileModalHistoryEvent: React.FC<ProfileModalHistoryEventData> = ({
  date,
  event,
  title
}) => (
  <Row align="start" className="mo-profile-history-event" spacing="sm">
    <div>
      <div />
      <div />
    </div>

    <Row justify="sb" spacing="xs">
      <div>
        <p className="mb-xxs--nlc body--bold">{event}</p>
        <p className="meta c-gray-3">{title}</p>
      </div>

      <p className="meta c-gray-3">{day(date).format('MMMM D, YYYY')}</p>
    </Row>
  </Row>
);

export default ProfileModalHistoryEvent;
