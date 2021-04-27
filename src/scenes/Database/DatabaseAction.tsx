import React, { FC, MutableRefObject } from 'react';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
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
  loading,
  ...props
}) => {
  const { disabled } = props;
  const ref: MutableRefObject<HTMLElement> = useTooltip(tooltip);

  const css: string = cx(
    'o-table-action',
    { 'o-table-action--disabled': disabled },
    className
  );

  return (
    <Button
      ref={ref}
      className={css}
      disabled={disabled}
      loading={loading}
      {...props}
    >
      {!loading && <Icon />}
    </Button>
  );
};

export default DatabaseAction;
