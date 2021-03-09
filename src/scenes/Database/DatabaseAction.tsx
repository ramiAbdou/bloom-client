import React, { FC, MutableRefObject } from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useTooltip from '@hooks/useTooltip';
import { cx } from '@util/util';

interface DatabaseActionProps extends ButtonProps {
  Icon: FC;
  tooltip?: string;
}

const DatabaseAction: React.FC<DatabaseActionProps> = ({
  Icon,
  tooltip,
  className,
  ...props
}) => {
  const { disabled } = props;
  const ref: MutableRefObject<HTMLElement> = useTooltip(tooltip);

  const css: string = cx('o-table-action', {
    [className]: className,
    'o-table-action--disabled': disabled
  });

  return (
    <Button ref={ref} className={css} disabled={disabled} {...props}>
      <Icon />
    </Button>
  );
};

export default DatabaseAction;
