import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  completed?: boolean;
  required: boolean;
}

export default ({ children, completed, required }: FormLabelProps) => {
  if (!children) return null;

  const css = makeClass(['c-form-label', [required, 'c-form-label--required']]);

  return (
    <div className={css}>
      {completed && <IoCheckmarkCircle />}
      <h4>{children}</h4>
    </div>
  );
};
