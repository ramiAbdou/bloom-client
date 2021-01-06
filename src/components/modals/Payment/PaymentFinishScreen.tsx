import { motion } from 'framer-motion';
import React from 'react';

import PaymentStore from './Payment.store';

const PaymentFinishScreen: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);

  if (screen !== 'FINISH') return null;

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      Finish Screen
    </motion.div>
  );
};

export default PaymentFinishScreen;
