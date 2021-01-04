import React from 'react';

import { ChildrenProps } from '@constants';
import { cx } from '@util/util';

interface StatusTagProps extends ChildrenProps {
  positive?: boolean;
}

const StatusTag: React.FC<StatusTagProps> = ({ children, positive }) => {
  const css = cx({
    'c-tag-status': true,
    'c-tag-status--negative': !positive,
    'c-tag-status--positive': positive
  });

  return (
    <div className={css}>
      <div />
      <h5>{children}</h5>
    </div>
  );
};

export default StatusTag;
