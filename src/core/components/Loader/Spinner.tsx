/**
 * @fileoverview Component: Spinner
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';

import CSSModifier from '@util/CSSModifier';

type SpinnerProps = { dark?: boolean };

export default ({ dark }: SpinnerProps) => {
  const { css } = new CSSModifier()
    .class('c-loader-spinner')
    .addClass(dark, 'c-loader-spinner--dark');

  return (
    <motion.div
      animate={{ rotate: 360 }}
      className={css}
      transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
    />
  );
};
