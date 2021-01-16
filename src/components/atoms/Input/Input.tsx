import React from 'react';

import { ValueProps } from '@constants';
import { cx } from '@util/util';

interface InputProps extends ValueProps {
  error?: boolean;
  placeholder?: string;
  onChange: (value: string) => any;
}

/**
 * Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 */
const Input = ({ error, placeholder, onChange, value }: InputProps) => {
  const modifiedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const css = cx('c-misc-input', { 'c-misc-input--error': error });

  return (
    <input
      className={css}
      placeholder={placeholder ?? ''}
      type="text"
      value={value ?? ''}
      onChange={modifiedOnChange}
    />
  );
};

export default Input;
