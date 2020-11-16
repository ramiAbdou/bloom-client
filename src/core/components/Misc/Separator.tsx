/**
 * @fileoverview Component: Separator
 * Thin, gray line that is used mostly in the context of having different
 * sections helping to break things up.
 * @author Rami Abdou
 */

import './Misc.scss';

import React from 'react';

import { StyleProps } from '@constants';

export default ({ style }: StyleProps) => (
  <div className="c-misc-sep" style={style} />
);
