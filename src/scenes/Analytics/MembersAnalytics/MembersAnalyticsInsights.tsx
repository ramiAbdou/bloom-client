import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import MembersAnalyticsActiveMembersCard from './MembersAnalyticsActiveCard';
import MembersAnalyticsTotalMembersCard from './MembersAnalyticsTotalCard';

const MembersAnalyticsInsights: React.FC = () => (
  <MainSection>
    <Row wrap gap="xs">
      <MembersAnalyticsTotalMembersCard />
      <MembersAnalyticsActiveMembersCard />
    </Row>
  </MainSection>
);

export default MembersAnalyticsInsights;
