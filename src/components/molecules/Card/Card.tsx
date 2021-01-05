import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { makeClass } from '@util/util';

interface CardProps extends ChildrenProps, ClassNameProps {}

const Card = ({ children, className }: CardProps) => {
  const css = makeClass(['c-misc-card', className]);
  return <div className={css}>{children}</div>;
};

export default Card;
