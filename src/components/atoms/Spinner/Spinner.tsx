import { motion } from 'framer-motion';
import React from 'react';

import { ShowProps } from '@constants';
import Show from '@containers/Show';
import { cx } from '@util/util';

interface SpinnerProps extends ShowProps {
  dark?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ dark, show }) => {
  const css = cx('c-spinner', { 'c-spinner--dark': dark });

  return (
    <Show show={!!show}>
      <motion.div
        animate={{ rotate: 360 }}
        className={css}
        transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
      />
    </Show>
  );
};

export default Spinner;
