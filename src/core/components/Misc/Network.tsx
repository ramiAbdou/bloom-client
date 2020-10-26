/**
 * @fileoverview Component: Network
 * - Network graphic from the Bloom style guide.
 * @author Rami Abdou
 */

import './Misc.scss';

import React from 'react';

import { ClassNameProps, StyleProps } from '@constants';
import { network } from './images';

interface NetworkProps extends StyleProps, ClassNameProps {}

export default ({ className, style }: NetworkProps) => (
  <img className={className} src={network} style={style} />
);
