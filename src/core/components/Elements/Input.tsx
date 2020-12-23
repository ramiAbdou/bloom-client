import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef
} from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface InputProps extends ValueProps {
  dark?: boolean;
  error?: boolean;
  placeholder?: string;
  onClickOutside?: (...args: any) => any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onEnter?: () => any;
}

/**
 * Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 */
export default ({
  dark,
  error,
  placeholder,
  onChange,
  onClickOutside,
  onEnter,
  value
}: InputProps) => {
  const ref: MutableRefObject<HTMLInputElement> = useRef(null);
  useOnClickOutside(ref, async () => onClickOutside && onClickOutside());

  const modifiedOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const modifiedKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter') return;
    ref.current.blur();
    if (onEnter) onEnter();
  };

  const css = makeClass([
    'c-misc-input',
    [!error && dark, 'c-misc-input--dark'],
    [error, 'c-misc-input--error']
  ]);

  return (
    <input
      ref={ref}
      className={css}
      placeholder={placeholder ?? ''}
      type="text"
      value={value}
      onChange={modifiedOnChange}
      onKeyDown={modifiedKeyDown}
    />
  );
};
