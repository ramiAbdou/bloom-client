import React from 'react';

import { ShowProps } from '@util/constants';
import Show from '@containers/Show';
import { cx } from '@util/util';

interface GridProps extends ShowProps {
  marginBottom?: number;
  spacing?: 'xxs' | 'xs' | 'sm';
}

const Grid: React.FC<GridProps> = ({
  children,
  marginBottom,
  show,
  spacing = 'xs'
}) => {
  const css: string = cx('t-grid', {
    't-grid--spacing-sm': spacing === 'sm',
    't-grid--spacing-xs': spacing === 'xs'
  });

  return (
    <Show show={show}>
      <div className={css} style={{ marginBottom }}>
        {children}
      </div>
    </Show>
  );
};

export default Grid;
