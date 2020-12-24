import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  completed?: boolean;
  large?: boolean;
  required: boolean;
}

export default ({ children, completed, large, required }: FormLabelProps) => {
  if (!children) return null;

  const css = makeClass([
    'c-form-label',
    [large, 'c-form-label--uppercase'],
    [required, 'c-form-label--required']
  ]);

  return (
    <div className={css}>
      {completed && <IoCheckmarkCircle />}
      <p>{children}</p>
    </div>
  );
};
