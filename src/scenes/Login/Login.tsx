import React from 'react';

import EmailConfirmation from './frames/Confirmation/Confirmation';
import LoginCard from './frames/LoginCard/LoginCard';
import Login from './Login.store';

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
