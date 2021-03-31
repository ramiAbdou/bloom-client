import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import useFinalPath from '@hooks/useFinalPath';

const MembershipHeader: React.FC = () => {
  const isChangeMemberType = useFinalPath() === 'change';

  return (
    <MainHeader
      backButton={isChangeMemberType}
      loading={false}
      title={
        isChangeMemberType ? 'Change Membership Type' : 'Manage Membership'
      }
    />
  );
};

export default MembershipHeader;
