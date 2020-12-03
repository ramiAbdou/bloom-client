import { motion } from 'framer-motion';
import React from 'react';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
export default () => (
  <motion.div
    key="c-modal-ctr"
    animate={{ opacity: 0.5 }}
    className="c-modal-ctr"
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.1 }}
  />
);
