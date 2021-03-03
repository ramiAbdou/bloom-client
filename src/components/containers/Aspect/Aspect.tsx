import React from 'react';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

interface AspectProps extends BaseProps {
  ratio: 1 | 2;
}

const Aspect: React.FC<AspectProps> = ({
  children,
  className,
  ratio,
  style
}) => {
  const css = cx('t-aspect', {
    [className]: className,
    't-aspect--1': ratio === 1,
    't-aspect--2': ratio === 2
  });

  return (
    <div className={css} style={style}>
      {children}
    </div>
  );
};

export default Aspect;
