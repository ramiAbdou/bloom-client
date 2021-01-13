import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface CardProps extends ChildrenProps, ClassNameProps {}

const Card = ({ children, className }: CardProps) => {
  const css = cx({ [className]: className, 't-misc-card': true });
  return <div className={css}>{children}</div>;
};

export default Card;
