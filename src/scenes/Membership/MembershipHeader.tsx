import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import useFinalPath from '@hooks/useFinalPath';

const MembershipHeader: React.FC = () => {
  const isChangePlan = useFinalPath() === 'change';

  return (
    <MainHeader
      backButton={isChangePlan}
      loading={false}
      title={isChangePlan ? 'Change Membership Plan' : 'Manage Membership'}
    />
  );
};

export default MembershipHeader;
