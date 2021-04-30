import React from 'react';

import BloomLogo from '@components/images/bloom.svg';
import NetworkIcon from '@components/images/network.svg';
import StoryPage from '@components/organisms/Story/StoryPage';
import LoginCard from './LoginCard';

const LoginCardHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <p>Welcome to</p>
      <BloomLogo style={{ height: 18 * 1.25, width: 75 * 1.25 }} />
    </div>

    <NetworkIcon stroke="#f58023" style={{ height: 151, opacity: 0.2 }} />
  </div>
);

const LoginMainPage: React.FC = () => (
  <StoryPage branches={{ MAIN: {} }}>
    <LoginCardHeader />
    <LoginCard />
  </StoryPage>
);

export default LoginMainPage;
