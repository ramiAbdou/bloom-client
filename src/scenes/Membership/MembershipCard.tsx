import React from 'react';

import { ChildrenProps } from '@constants';
import Card from '@containers/Card/Card';

const MembershipCard: React.FC<ChildrenProps> = ({ children }) => {
  return <Card className="s-membership-card">{children}</Card>;
};

export default MembershipCard;
