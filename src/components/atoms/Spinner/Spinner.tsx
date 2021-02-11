import { motion } from 'framer-motion';
import React from 'react';

import { LoadingProps } from '@constants';
import Show from '@containers/Show';
import { cx } from '@util/util';

interface SpinnerProps extends LoadingProps {
  dark?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ dark, loading = true }) => {
  const css = cx('c-spinner', { 'c-spinner--dark': dark });

  return (
    <Show show={!!loading}>
      <motion.div
        animate={{ rotate: 360 }}
        className={css}
        transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
      />
    </Show>
  );
};

export default Spinner;
