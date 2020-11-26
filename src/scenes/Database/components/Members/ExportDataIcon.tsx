/**
 * @fileoverview Component: Export Data Icon
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosExit } from 'react-icons/io';

import DatabaseAction from './DatabaseAction';

export default () => (
  <DatabaseAction Component={IoIosExit} value="Export Member Data" />
);
