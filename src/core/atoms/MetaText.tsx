import React from 'react';

import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface MetaProps extends ChildrenProps {
  large?: boolean;
}

const Meta = ({ children, large }: MetaProps) => {
  const css = makeClass(['meta', [large, 'meta--lg']]);
  return <p className={css}>{children}</p>;
};

export default Meta;
