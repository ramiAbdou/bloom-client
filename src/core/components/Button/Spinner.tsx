/**
 * @fileoverview Component: Spinner
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';

export default () => (
  <motion.div
    animate={{ rotate: 360 }}
    className="c-btn-spinner"
    transition={{ duration: 0.75, ease: 'linear', loop: Infinity }}
  />
);
