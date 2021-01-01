import { motion } from 'framer-motion';
import React from 'react';

import { LoadingProps } from '@constants';
import { makeClass } from '@util/util';

interface SpinnerProps extends LoadingProps {
  dark?: boolean;
}

export default ({ dark, loading }: SpinnerProps) => {
  if (loading === false) return null;

  const css = makeClass(['c-loader-spinner', [dark, 'c-loader-spinner--dark']]);

  return (
    <motion.div
      animate={{ rotate: 360 }}
      className={css}
      transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
    />
  );
};
