import React from 'react';

import { ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface AspectRatioProps extends ClassNameProps {
  ratio: 1 | 2;
}

const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  className,
  ratio
}) => {
  const css = cx('t-aspect', {
    [className]: className,
    't-aspect--1': ratio === 1,
    't-aspect--2': ratio === 2
  });

  return <div className={css}>{children}</div>;
};

export default AspectRatio;
