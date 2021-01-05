import React from 'react';

import EmailConfirmation from './Confirmation/Confirmation';
import LoginStore from './Login.store';
import LoginCard from './LoginCard/LoginCard';

const LoginContent: React.FC = () => {
  const linkSent = LoginStore.useStoreState((store) => store.hasLoginLinkSent);
  return linkSent ? <EmailConfirmation /> : <LoginCard />;
};

const Login: React.FC = () => (
  <LoginStore.Provider>
    <div className="s-login-ctr">
      <LoginContent />
    </div>
  </LoginStore.Provider>
);

export default Login;
