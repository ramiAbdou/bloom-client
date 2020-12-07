import React from 'react';

import { StyleProps } from '@constants';

/**
 * Thin, gray line that is used mostly in the context of having different
 * sections helping to break things up.
 */
export default ({ style }: StyleProps) => (
  <div className="c-misc-sep" style={style} />
);
