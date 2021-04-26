import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';

interface MembersAnalyticsTotalMembersCardProps {
  count: number;
}

const MembersAnalyticsTotalMembersCard: React.FC<MembersAnalyticsTotalMembersCardProps> = ({
  count
}) => <GrayCard label="Total Members" value={count} />;

export default MembersAnalyticsTotalMembersCard;
