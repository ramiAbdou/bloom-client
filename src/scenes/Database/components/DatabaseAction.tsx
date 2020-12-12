import React, { FC, memo, MutableRefObject } from 'react';

import Button from '@components/Button/Button';
import { ClassNameProps, LoadingProps, OnClickProps } from '@constants';
import useTooltip from '@hooks/useTooltip';
import { makeClass } from '@util/util';

interface DatabaseActionProps
  extends Partial<LoadingProps>,
    Partial<ClassNameProps>,
    OnClickProps {
  Icon: FC;
  disabled?: boolean;
  tooltip?: string;
}

export default memo(
  ({ Icon, disabled, tooltip, className, ...props }: DatabaseActionProps) => {
    const ref: MutableRefObject<HTMLElement> = useTooltip(tooltip);

    const css = makeClass([
      's-database-action',
      [disabled, 's-database-action--disabled'],
      className
    ]);

    return (
      <Button ref={ref} className={css} disabled={disabled} {...props}>
        <Icon />
      </Button>
    );
  }
);
