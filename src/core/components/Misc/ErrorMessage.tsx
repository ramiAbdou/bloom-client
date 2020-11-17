/**
 * @fileoverview Component: ErrorMessage
 * @author Rami Abdou
 */

import './Misc.scss';

import { motion } from 'framer-motion';
import React from 'react';

import { MessageProps } from '@constants';
import error from './images/error.svg';

interface ErrorMessageProps extends MessageProps {
  marginBottom?: number;
  marginTop?: number;
}

export default ({ marginBottom, marginTop, message }: ErrorMessageProps) => (
  <motion.div
    animate={{ opacity: 1 }}
    className="c-misc-error"
    initial={{ opacity: 0 }}
    style={{ marginBottom, marginTop }}
    transition={{ duration: 0.2 }}
  >
    <img alt="Error Icon" src={error} />
    <p>{message}</p>
  </motion.div>
);
