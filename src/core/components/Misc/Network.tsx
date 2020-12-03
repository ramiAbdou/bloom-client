import React from 'react';

import { ClassNameProps, StyleProps } from '@constants';
import network from './images/network.svg';

interface NetworkProps extends StyleProps, ClassNameProps {}

export default ({ className, style }: NetworkProps) => (
  <img className={className} src={network} style={style} />
);
