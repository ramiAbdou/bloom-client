/**
 * @fileoverview Component: Input
 * - Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 * @author Rami Abdou
 */

import './Misc.scss';

import React, { ChangeEvent, MutableRefObject, useRef } from 'react';

import { ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

interface InputProps extends ValueProps {
  dark?: boolean;
  error?: boolean;
  gray?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}

export default ({ dark, error, gray, onChange, value }: InputProps) => {
  const ref: MutableRefObject<HTMLInputElement> = useRef(null);

  // Selects the entire value of the input, which uses the custom highlight
  // color.
  const onClick = () => ref?.current?.select();

  const { css } = new CSSModifier('c-misc-input')
    .addClass(dark, 'c-misc-input--dark')
    .addClass(gray, 'c-misc-input--gray')
    .addClass(error, 'c-misc-input--error');

  return (
    <input
      ref={ref}
      className={css}
      type="text"
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
};
