import React from 'react';

import BloomLogo from '@images/bloom.svg';
import NetworkIcon from '@images/network.svg';
import LoginCardContent from '@modals/CheckIn/CheckInLoginContent';

const LoginCardHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <p>Welcome to</p>
      <BloomLogo style={{ height: 18 * 1.25, width: 75 * 1.25 }} />
    </div>

    <NetworkIcon stroke="#f58023" style={{ height: 151, opacity: 0.2 }} />
  </div>
);

const LoginCard: React.FC = () => (
  <>
    <LoginCardHeader />
    <LoginCardContent />
  </>
);

export default LoginCard;
