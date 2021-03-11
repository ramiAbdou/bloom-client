/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import Attribute from '@atoms/Tag/Attribute';
import Show from '@containers/Show';
import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

interface CheckboxProps extends BaseProps {
  checked?: boolean;
  format?: (value: string) => string;
  plain?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  format,
  plain,
  onChange,
  show,
  title
}) => {
  const css: string = cx(
    'c-misc-checkbox',
    { 'c-misc-checkbox--label': title, 'c-misc-checkbox--plain': plain },
    className
  );

  return (
    <Show show={show}>
      <label className={css} onClick={(e) => e.stopPropagation()}>
        <input checked={checked} type="checkbox" onChange={onChange} />
        <span />
        <IoCheckmark color="#FFF" />
        {plain && <p>{title}</p>}
        <Attribute show={!plain} showNullValue={false}>
          {format ? format(title) : title}
        </Attribute>
      </label>
    </Show>
  );
};

export default Checkbox;
