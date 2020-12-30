import React from 'react';

import Card from '@components/Elements/Card/Card';
import Login from './Login.store';
import EmailConfirmation from './pages/Confirmation/Confirmation';
import LoginCard from './pages/LoginCard/LoginCard';

const LoginContent = () => {
  const linkSent = Login.useStoreState((store) => store.hasLoginLinkSent);
  return linkSent ? <EmailConfirmation /> : <LoginCard />;
};

export default () => (
  <Login.Provider>
    <div className="s-login-ctr">
      <Card className="s-login-card">
        <LoginContent />
      </Card>
    </div>
  </Login.Provider>
);
