import { motion } from 'framer-motion';
import React from 'react';

import { makeClass } from '@util/util';

type SpinnerProps = { dark?: boolean };

export default ({ dark }: SpinnerProps) => {
  const css = makeClass(['c-loader-spinner', [dark, 'c-loader-spinner--dark']]);

  return (
    <motion.div
      animate={{ rotate: 360 }}
      className={css}
      transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
    />
  );
};
