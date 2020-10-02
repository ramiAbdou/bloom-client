/**
 * @fileoverview Component: Separator
 * Thin, gray line that is used mostly in the context of having different
 * sections helping to break things up.
 * @author Rami Abdou
 */

import './Miscellanous.scss';

import React from 'react';

type SeparatorProps = { style?: React.CSSProperties };

export default ({ style }: SeparatorProps) => (
  <div className="c-misc-sep" style={style} />
);
