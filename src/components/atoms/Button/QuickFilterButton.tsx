import React from 'react';

import { cx } from '@util/util';
import Button from './Button';

interface QuickFilterButtonProps {
  active: boolean;
  onClick: VoidFunction;
}

const QuickFilterButton: React.FC<QuickFilterButtonProps> = ({
  active,
  children,
  onClick
}) => {
  const css: string = cx('c-btn--quick-filter', {
    'c-btn--quick-filter--active': active
  });

  return (
    <Button className={css} onClick={onClick}>
      {children}
    </Button>
  );
};

export default QuickFilterButton;
