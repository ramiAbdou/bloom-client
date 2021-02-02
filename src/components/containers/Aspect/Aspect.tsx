import React from 'react';

import { ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface AspectProps extends ClassNameProps {
  ratio: 1 | 2;
}

const Aspect: React.FC<AspectProps> = ({ children, className, ratio }) => {
  const css = cx('t-aspect', {
    [className]: className,
    't-aspect--1': ratio === 1,
    't-aspect--2': ratio === 2
  });

  return <div className={css}>{children}</div>;
};

export default Aspect;
