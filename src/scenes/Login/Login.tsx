import React from 'react';

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
      <div className="s-login-card">
        <LoginContent />
      </div>
    </div>
  </Login.Provider>
);
