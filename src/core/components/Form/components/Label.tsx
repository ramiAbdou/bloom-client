import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import { makeClass } from '@util/util';

type LabelProps = { completed?: boolean; required: boolean; title: string };

export default ({ completed, required, title }: LabelProps) => {
  const css = makeClass(['c-form-label', [required, 'c-form-label--required']]);

  return (
    <div className={css}>
      {completed && <IoCheckmarkCircle />}
      <p>{title}</p>
    </div>
  );
};
