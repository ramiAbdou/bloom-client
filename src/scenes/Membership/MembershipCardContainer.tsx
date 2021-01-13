import React from 'react';

import { ChildrenProps } from '@constants';

const MembershipCardContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="s-membership-card-ctr">{children}</div>;
};

export default MembershipCardContainer;
