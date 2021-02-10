import React from 'react';

import { ShowProps } from '@constants';
import { takeFirst } from '@util/util';

interface SeparatorProps extends ShowProps {
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
  noMargin,
  show
}) => {
  if (show === false) return null;

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

  return <hr className="c-misc-sep" style={{ marginBottom, marginTop }} />;
};

export default Separator;
