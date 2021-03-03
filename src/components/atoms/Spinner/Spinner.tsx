import React from 'react';

import Show from '@containers/Show';
import { ShowProps } from '@util/constants';
import { cx } from '@util/util';

interface SpinnerProps extends ShowProps {
  dark?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ dark, show }) => {
  const css = cx('c-spinner', { 'c-spinner--dark': dark });

  return (
    <Show show={!!show}>
      <div className={css} />
    </Show>
  );
};

export default Spinner;
