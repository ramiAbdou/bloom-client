/**
 * @fileoverview Component: DatabaseAction
 * @author Rami Abdou
 */

import React, { FC, memo } from 'react';

import Button from '@components/Button/Button';
import { ClassNameProps, LoadingProps, OnClickProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

interface DatabaseActionProps
  extends Partial<LoadingProps>,
    Partial<ClassNameProps>,
    OnClickProps {
  Component: FC;
  disabled?: boolean;
  value?: string;
}

export default memo(
  ({ Component, value, className, ...props }: DatabaseActionProps) => {
    const { css } = new CSSModifier()
      .class('s-database-action')
      .class(className);

    return (
      <Button noHover className={css} value={value} {...props}>
        <Component />
      </Button>
    );
  }
);
