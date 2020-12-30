/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { ClassNameProps, OnClickProps } from '@constants';
import { makeClass } from '@util/util';

interface CheckboxProps extends ClassNameProps, OnClickProps {
  checked?: boolean;
}

export default ({ className, checked, onClick }: CheckboxProps) => {
  const onChange = () => onClick();
  const css = makeClass(['c-misc-checkbox', className]);

  return (
    <label className={css} onClick={(e) => e.stopPropagation()}>
      <input checked={checked} type="checkbox" onChange={onChange} />
      <span />
      <IoCheckmark color="#FFF" />
    </label>
  );
};
