import React from 'react';

import { cx } from '@util/util';

interface StatusTagProps {
  positive?: boolean;
}

const StatusTag: React.FC<StatusTagProps> = ({ children, positive }) => {
  const css: string = cx('c-tag-status', {
    'c-tag-status--negative': !positive,
    'c-tag-status--positive': positive
  });

  return (
    <div className={css}>
      <div />
      <h4>{children}</h4>
    </div>
  );
};

export default StatusTag;
