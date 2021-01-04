import React from 'react';

import { StyleProps } from '@constants';

interface SeparatorProps extends StyleProps {
  vertical?: boolean;
}

/**
 * Thin, gray line that is used mostly in the context of having different
 * sections helping to break things up.
 */
export default ({ style, vertical }: SeparatorProps) => {
  const className = vertical ? 'c-misc-sep--vertical' : 'c-misc-sep';
  return <div className={className} style={style} />;
};
