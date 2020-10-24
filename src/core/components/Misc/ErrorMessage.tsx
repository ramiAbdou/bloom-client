/**
 * @fileoverview Component: ErrorMessage
 * @author Rami Abdou
 */

import './Misc.scss';

import { motion } from 'framer-motion';
import React from 'react';

import { error } from './images';

type ErrorMessageProps = { message: string };

export default ({ message }: ErrorMessageProps) => (
  <motion.div
    animate={{ opacity: 1 }}
    className="c-misc-error"
    initial={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <img alt="Error Icon" src={error} />
    <p>{message}</p>
  </motion.div>
);
