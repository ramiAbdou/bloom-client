import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { LoadingProps } from '@constants';
import { cx } from '@util/util';

interface SpinnerProps extends LoadingProps {
  dark?: boolean;
}

/**
 * Returns the state of the spinner. Adds a 100ms delay in order to show the
 * spinner so that it doesn't show the spinner for really short time.
 */
const useShowSpinner = (loading: boolean): boolean => {
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

  return showSpinner;
};

const Spinner: React.FC<SpinnerProps> = ({ dark, loading }) => {
  const showSpinner = useShowSpinner(loading);
  if (!showSpinner) return null;

  const css = cx({ 'c-spinner': true, 'c-spinner--dark': dark });

  return (
    <motion.div
      animate={{ rotate: 360 }}
      className={css}
      transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
    />
  );
};

export default Spinner;
