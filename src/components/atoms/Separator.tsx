import React from 'react';

import { takeFirst } from '@util/util';

interface SeparatorProps {
  margin?: number; // Refers only to the vertical margin.
  marginBottom?: number;
  marginTop?: number;
  noMargin?: boolean; // True if marginTop and marginBottom should be 0.
}

/**
 * Thin, gray line that is used mostly in the context of having different
 * sections helping to break things up.
 */
const Separator: React.FC<SeparatorProps> = ({
  margin,
  marginBottom: mBottom,
  marginTop: mTop,
  noMargin
}) => {
  const marginTop = takeFirst([
    [noMargin, 0],
    [margin !== undefined, margin],
    [mTop !== undefined, mTop]
  ]);

  const marginBottom = takeFirst([
    [noMargin, 0],
    [margin !== undefined, margin],
    [mBottom !== undefined, mBottom]
  ]);

  return <div className="c-misc-sep" style={{ marginBottom, marginTop }} />;
};

export default Separator;
