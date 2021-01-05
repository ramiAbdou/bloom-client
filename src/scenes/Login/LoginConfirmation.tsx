import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

const LoginConfirmationHeader: React.FC = () => (
  <div>
    <IoCheckmarkCircle />
    <h1>Login Link Sent</h1>
  </div>
);

const LoginConfirmation: React.FC = () => (
  <motion.div
    animate={{ x: 0 }}
    className="s-login-confirmation"
    initial={{ x: 50 }}
    transition={{ duration: 0.2 }}
  >
    <LoginConfirmationHeader />

    <p>
      We just sent you a temporary login link. It will expire in 5 minutes. If
      you have any trouble, you can request another login link or login with
      Google.
    </p>

    <p>You may now close this page.</p>
  </motion.div>
);

export default LoginConfirmation;
