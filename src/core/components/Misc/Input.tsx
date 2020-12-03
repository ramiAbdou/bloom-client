/**
 * @fileoverview Component: Input
 * - Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 * @author Rami Abdou
 */

import './Misc.scss';

import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef
} from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

interface InputProps extends ValueProps {
  dark?: boolean;
  error?: boolean;
  gray?: boolean;
  onClickOutside?: (...args: any) => any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (key: string) => any;
}

export default ({
  dark,
  error,
  gray,
  onChange,
  onClickOutside,
  onKeyDown,
  value
}: InputProps) => {
  const ref: MutableRefObject<HTMLInputElement> = useRef(null);

  useOnClickOutside(ref, async () => {
    if (onClickOutside) await onClickOutside();
  });

  // Selects the entire value of the input, which uses the custom highlight
  // color.
  const onClick = () => ref?.current?.select();

  const modifiedKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') ref.current.blur();
    if (onKeyDown) onKeyDown(key);
  };

  const { css } = new CSSModifier('c-misc-input')
    .addClass(dark, 'c-misc-input--dark')
    .addClass(gray, 'c-misc-input--gray')
    .addClass(error, 'c-misc-input--error');

  return (
    <input
      ref={ref}
      className={css}
      type="text"
      value={value ?? ''}
      onChange={onChange}
      onClick={onClick}
      onKeyDown={modifiedKeyDown}
    />
  );
};
