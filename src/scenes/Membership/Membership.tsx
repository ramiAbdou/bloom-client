import React from 'react';

import MembershipStore from './Membership.store';
import MembershipContent from './MembershipContent';

const Membership: React.FC = () => (
  <MembershipStore.Provider>
    <MembershipContent />
  </MembershipStore.Provider>
);

export default Membership;
