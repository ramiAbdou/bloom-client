import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';

interface MembersAnalyticsTotalActiveCardProps {
  count: number;
}

const MembersAnalyticsActiveCard: React.FC<MembersAnalyticsTotalActiveCardProps> = ({
  count
}) => <GrayCard label="Active Users" value={count} />;

export default MembersAnalyticsActiveCard;
