import React from 'react';

import { ChildrenProps } from '@constants';
import { cx } from '@util/util';

interface ActionContainerProps extends ChildrenProps {
  equal?: boolean;
  marginTopAuto?: boolean;
}

const ActionContainer: React.FC<ActionContainerProps> = ({
  children,
  equal,
  marginTopAuto
}) => {
  const css = cx('t-action-ctr', {
    't-action-ctr--equal': equal,
    't-action-ctr--margin-top-auto': marginTopAuto,
    't-action-ctr--standard': !equal
  });

  return <div className={css}>{children}</div>;
};

export default ActionContainer;
