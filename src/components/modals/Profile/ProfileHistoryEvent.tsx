import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { MemberHistoryData } from './Profile.types';

const ProfileHistoryEvent: React.FC<MemberHistoryData> = ({
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

export default ProfileHistoryEvent;
