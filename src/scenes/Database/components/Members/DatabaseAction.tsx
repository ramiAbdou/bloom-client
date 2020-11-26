/**
 * @fileoverview Component: DatabaseAction
 * @author Rami Abdou
 */

import React, { FC, memo } from 'react';

import Button from '@components/Button/Button';
import { LoadingProps, OnClickProps } from '@constants';

interface DatabaseActionProps extends Partial<LoadingProps>, OnClickProps {
  Component: FC;
  disabled?: boolean;
  value?: string;
}

export default memo(({ Component, value, ...props }: DatabaseActionProps) => (
  <Button noHover className="s-database-action" value={value} {...props}>
    <Component />
  </Button>
));
