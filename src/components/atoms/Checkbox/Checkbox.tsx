/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { Attribute } from '@atoms/Tags';
import { ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface CheckboxProps extends ClassNameProps {
  checked?: boolean;
  onChange: (checked: boolean) => any;
  title?: string;
}

const Checkbox = ({ className, checked, onChange, title }: CheckboxProps) => {
  const onCheckboxChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.checked);
  };

  const onLabelClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const css = cx({
    'c-misc-checkbox': true,
    'c-misc-checkbox--label': title,
    [className]: className
  });

  return (
    <label className={css} onClick={onLabelClick}>
      <input checked={checked} type="checkbox" onChange={onCheckboxChange} />
      <span />
      <IoCheckmark color="#FFF" />
      <Attribute showNullValue={false}>{title}</Attribute>
    </label>
  );
};

export default Checkbox;
