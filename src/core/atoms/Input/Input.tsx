import React, { MutableRefObject, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface InputProps extends ValueProps {
  error?: boolean;
  placeholder?: string;
  onClickOutside?: (...args: any) => any;
  onChange: (value: string) => any;
  onEnter?: () => any;
}

/**
 * Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 */
const Input = ({
  error,
  placeholder,
  onChange,
  onClickOutside,
  onEnter,
  value
}: InputProps) => {
  const ref: MutableRefObject<HTMLInputElement> = useRef(null);
  useOnClickOutside(ref, async () => onClickOutside && onClickOutside());

  const modifiedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const modifiedKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter') return;
    ref.current.blur();
    if (onEnter) onEnter();
  };

  const css = makeClass(['c-misc-input', [error, 'c-misc-input--error']]);

  return (
    <input
      ref={ref}
      className={css}
      placeholder={placeholder ?? ''}
      type="text"
      value={value ?? ''}
      onChange={modifiedOnChange}
      onKeyDown={modifiedKeyDown}
    />
  );
};

export default Input;
