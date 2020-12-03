/**
 * @fileoverview Component: DatabaseAction

 */

import React, { FC, memo } from 'react';

import Button from '@components/Button/Button';
import { ClassNameProps, LoadingProps, OnClickProps } from '@constants';
import { makeClass } from '@util/util';

interface DatabaseActionProps
  extends Partial<LoadingProps>,
    Partial<ClassNameProps>,
    OnClickProps {
  Component: FC;
  disabled?: boolean;
  value?: string;
}

export default memo(
  ({
    Component,
    disabled,
    value,
    className,
    ...props
  }: DatabaseActionProps) => {
    const css = makeClass([
      's-database-action',
      [disabled, 's-database-action--disabled'],
      className
    ]);

    return (
      <Button
        noHover
        className={css}
        disabled={disabled}
        value={value}
        {...props}
      >
        <Component />
      </Button>
    );
  }
);
