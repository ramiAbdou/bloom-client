import React from 'react';

import { TitleProps } from '@constants';
import { cx } from '@util/util';

interface ToggleProps extends TitleProps {
  on?: boolean;
  onChange?: VoidFunction;
}

const Toggle: React.FC<ToggleProps> = ({ on, onChange, title }) => {
  const css = cx('m-toggle', { 'm-toggle--on': on });

  return (
    <div className={css}>
      <p>{title}</p>

      <div onClick={onChange}>
        <div />
      </div>
    </div>
  );
};

export default Toggle;
