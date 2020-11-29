/**
 * @fileoverview Component: Checkbox
 * @author Rami Abdou
 */

import './Misc.scss';

import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import { ClassNameProps, OnClickProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

interface CheckboxProps extends ClassNameProps, OnClickProps {
  selected?: boolean;
}

export default ({ className, selected, onClick }: CheckboxProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickCheckbox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (onClick) onClick();
    else setIsSelected(!isSelected);
  };

  const { css } = new CSSModifier()
    .class('c-misc-checkbox')
    .addClass(selected || isSelected, 'c-misc-checkbox--active')
    .addClass(!!className, className);

  return (
    <div className={css} onClick={onClickCheckbox}>
      {(selected || isSelected) && <IoMdCheckmark color="#FFF" />}
    </div>
  );
};
