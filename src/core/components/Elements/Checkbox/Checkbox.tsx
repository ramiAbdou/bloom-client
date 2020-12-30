/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import Attribute from '@components/Tags/Attribute';
import { ClassNameProps, OnClickProps } from '@constants';
import { makeClass } from '@util/util';

interface CheckboxProps extends ClassNameProps, OnClickProps {
  checked?: boolean;
  title?: string;
}

export default ({ className, checked, onClick, title }: CheckboxProps) => {
  const onChange = () => onClick();

  const css = makeClass([
    'c-misc-checkbox',
    [!!title, 'c-misc-checkbox--label'],
    className
  ]);

  return (
    <label className={css} onClick={(e) => e.stopPropagation()}>
      <input checked={checked} type="checkbox" onChange={onChange} />
      <span />
      <IoCheckmark color="#FFF" />
      {!!title && <Attribute value={title} />}
    </label>
  );
};
