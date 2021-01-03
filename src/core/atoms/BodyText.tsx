import React from 'react';

import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface BodyProps extends ChildrenProps {
  bold?: boolean;
  small?: boolean;
}

const Body = ({ bold, children, small }: BodyProps) => {
  const css = makeClass([
    [bold, 'body--bold'],
    [small, 'body--sm']
  ]);

  return <p className={css}>{children}</p>;
};

export default Body;
