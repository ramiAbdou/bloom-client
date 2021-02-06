import React, { FC, memo, MutableRefObject } from 'react';

import Button from '@atoms/Button/Button';
import { ClassNameProps, LoadingProps, OnClickProps } from '@constants';
import useTooltip from '@hooks/useTooltip';
import { cx } from '@util/util';

interface DatabaseActionProps
  extends Partial<LoadingProps>,
    Partial<ClassNameProps>,
    OnClickProps {
  Icon: FC;
  disabled?: boolean;
  tooltip?: string;
}

const DatabaseAction: React.FC<DatabaseActionProps> = ({
  Icon,
  disabled,
  tooltip,
  className,
  ...props
}) => {
  const ref: MutableRefObject<HTMLElement> = useTooltip(tooltip);

  const css = cx('s-database-action', {
    [className]: className,
    's-database-action--disabled': disabled
  });

  return (
    <Button ref={ref} className={css} disabled={disabled} {...props}>
      <Icon />
    </Button>
  );
};

export default DatabaseAction;
