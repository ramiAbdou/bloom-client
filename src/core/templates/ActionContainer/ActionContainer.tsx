import React from 'react';

import { ChildrenProps } from '@constants';
import { cx } from '@util/util';

interface ActionContainerProps extends ChildrenProps {
  equal?: boolean;
}

const ActionContainer: React.FC<ActionContainerProps> = ({
  children,
  equal
}) => {
  const css = cx({
    't-action-ctr': true,
    't-action-ctr--equal': equal,
    't-action-ctr--standard': !equal
  });

  return <div className={css}>{children}</div>;
};

export default ActionContainer;
