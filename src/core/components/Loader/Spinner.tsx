import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { LoadingProps } from '@constants';
import { makeClass } from '@util/util';

interface SpinnerProps extends LoadingProps {
  dark?: boolean;
}

export default ({ dark, loading }: SpinnerProps) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!loading && showSpinner) setShowSpinner(false);
    else {
      timeout = setTimeout(() => {
        if (loading && !showSpinner) setShowSpinner(true);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [loading, showSpinner]);

  if (!showSpinner) return null;

  const css = makeClass(['c-loader-spinner', [dark, 'c-loader-spinner--dark']]);

  return (
    <motion.div
      animate={{ rotate: 360 }}
      className={css}
      transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
    />
  );
};
