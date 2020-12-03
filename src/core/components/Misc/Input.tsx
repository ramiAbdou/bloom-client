import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef,
  useState
} from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface InputProps extends ValueProps {
  dark?: boolean;
  error?: boolean;
  gray?: boolean;
  placeholder?: string;
  onClickOutside?: (...args: any) => any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (key: string) => any;
}

/**
 * Resuable and customizable input component. Has three different versions:
 * regular, dark and gray.
 */
export default ({
  dark,
  error,
  gray,
  placeholder,
  onChange,
  onClickOutside,
  onKeyDown,
  value
}: InputProps) => {
  const [text, setText] = useState<string>(value ?? '');

  const ref: MutableRefObject<HTMLInputElement> = useRef(null);

  useOnClickOutside(ref, async () => {
    if (onClickOutside) await onClickOutside();
    if (text === placeholder) setText('');
  });

  // Selects the entire value of the input, which uses the custom highlight
  // color. If we had a placeholder
  /**
   * Selects the entire value of the input, which uses the custom highlight
   * color. If we have a placeholder but no value, set the text to be the
   * placeholder.
   */
  const onClick = () => {
    const { current } = ref;
    if (!text && placeholder) setText(placeholder);
    setTimeout(() => current.select(), 0);
  };

  const modifiedOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setText(event.target.value);
  };

  const modifiedKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') ref.current.blur();
    if (onKeyDown) onKeyDown(key);
  };

  const css = makeClass([
    'c-misc-input',
    [!error && dark, 'c-misc-input--dark'],
    [!error && gray, 'c-misc-input--gray'],
    [error, 'c-misc-input--error']
  ]);

  return (
    <input
      ref={ref}
      className={css}
      placeholder={placeholder ?? ''}
      type="text"
      value={text}
      onChange={modifiedOnChange}
      onClick={onClick}
      onKeyDown={modifiedKeyDown}
    />
  );
};
