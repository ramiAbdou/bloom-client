/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import Attribute from '@components/Tags/Attribute';
import { ClassNameProps } from '@constants';
import { makeClass } from '@util/util';

interface CheckboxProps extends ClassNameProps {
  checked?: boolean;
  onChange: (checked: boolean) => any;
  title?: string;
}

export default ({ className, checked, onChange, title }: CheckboxProps) => {
  const onCheckboxChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.checked);
  };

  const onLabelClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const css = makeClass([
    'c-misc-checkbox',
    [!!title, 'c-misc-checkbox--label'],
    className
  ]);

  return (
    <label className={css} onClick={onLabelClick}>
      <input checked={checked} type="checkbox" onChange={onCheckboxChange} />
      <span />
      <IoCheckmark color="#FFF" />
      {!!title && <Attribute value={title} />}
    </label>
  );
};
