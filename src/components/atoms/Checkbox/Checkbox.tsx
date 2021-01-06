/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { Attribute } from '@atoms/Tags';
import { ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface CheckboxProps extends ClassNameProps {
  checked?: boolean;
  plain?: boolean;
  onChange: (checked: boolean) => any;
  title?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  plain,
  onChange,
  title
}) => {
  const onCheckboxChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.checked);
  };

  const css = cx({
    'c-misc-checkbox': true,
    'c-misc-checkbox--label': title,
    'c-misc-checkbox--plain': plain,
    [className]: className
  });

  return (
    <label className={css} onClick={(e) => e.stopPropagation()}>
      <input checked={checked} type="checkbox" onChange={onCheckboxChange} />
      <span />
      <IoCheckmark color="#FFF" />
      {plain && <p>{title}</p>}
      {!plain && <Attribute showNullValue={false}>{title}</Attribute>}
    </label>
  );
};

export default Checkbox;
