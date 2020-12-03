/**
 * @fileoverview Components: Label

 */

import './Form.scss';

import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import { makeClass } from '@util/util';

type LabelProps = { completed?: boolean; required: boolean; title: string };

export default ({ completed, required, title }: LabelProps) => {
  const css = makeClass(['c-form-label', [required, 'c-form-label--required']]);

  return (
    <div className={css}>
      <div>
        {completed && <IoIosCheckmarkCircle />}
        <p>{title}</p>
      </div>
    </div>
  );
};
