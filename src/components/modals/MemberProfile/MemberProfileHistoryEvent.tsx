import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import { MemberHistoryData } from './MemberProfile.types';

const MemberProfileHistoryEvent: React.FC<MemberHistoryData> = ({
  date,
  event,
  title
}) => {
  return (
    <Row align="start" className="mo-member-profile-history-event" spacing="sm">
      <div>
        <div />
        <div />
      </div>

      <Row spaceBetween>
        <div>
          <p className="mb-xxs body--bold">{event}</p>
          <p className="meta c-gray-3">{title}</p>
        </div>

        <p className="meta c-gray-3">{day(date).format('MMMM D, YYYY')}</p>
      </Row>
    </Row>
  );
};

export default MemberProfileHistoryEvent;