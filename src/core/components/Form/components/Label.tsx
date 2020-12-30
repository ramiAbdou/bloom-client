import React from 'react';

import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  required: boolean;
}

export default ({ children, required }: FormLabelProps) => {
  if (!children) return null;

  const css = makeClass(['c-form-label', [required, 'c-form-label--required']]);

  return (
    <div className={css}>
      <h4>{children}</h4>
    </div>
  );
};
