/**
 * @fileoverview Component: ShortText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { useEffect, useRef, useState } from 'react';

import { useScreen } from '@state/screen';
import { ShortTextProps, TextBarProps } from '../../Form.types';
import FormItem from '../FormItem/FormItem';
import FormItemProvider, { useFormItem } from '../FormItem/FormItem.state';
import ShortTextProvider, { useShortText } from './ShortText.state';

const TextBar = ({ hasError, placeholder }: TextBarProps) => {
  const { activate, inactivate, isActive } = useFormItem();
  const { isMobile } = useScreen();
  const { text, updateText } = useShortText();

  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

  // This scrolls the input element as far as possible to the right, where it
  // also places the cursor.
  const scrollToEnd = () => {
    const element = inputRef.current;
    element.scrollLeft = element.scrollWidth - element.clientWidth;
    element.selectionStart = text.length;
  };

  const onClick = () => {
    activate();
    if (isMobile) scrollToEnd();
  };

  let className: string;
  if (hasError && isActive) className = 'c-form-input--error';
  else if (isActive) className = 'c-form-input--active';
  else className = 'c-form-input';

  return (
    <button className={className} onFocus={() => inputRef.current.focus()}>
      <input
        ref={inputRef}
        className="c-form-input__txt"
        placeholder={text || placeholder || ''}
        type="text"
        value={text}
        onChange={({ target }) => updateText(target.value)}
        onClick={onClick}
        onFocus={onClick}
        // If the user presses tab, inactivate the current form item.
        onKeyDown={({ keyCode }) => keyCode === 9 && inactivate()}
      />
    </button>
  );
};

// -----------------------------------------------------------------------------

const ShortTextContent = ({
  initialValue,
  maxCharacters,
  placeholder,
  validate,
  ...props
}: ShortTextProps) => {
  const [error, setError] = useState('');

  const { text, setMaxCharacters, updateText } = useShortText();

  useEffect(() => {
    updateText(initialValue || '');
    setMaxCharacters(maxCharacters);
  }, []);

  useEffect(() => {
    // If the value hasn't changed and there's no validate function, don't
    // execute this error-checking hook.
    if (!validate) {
      if (error) setError('');
      return () => {};
    }

    // First, clear the error when the user starts typing.
    setError('');

    // After 1000 seconds, do the error check.
    const delayErrorCheck = setTimeout(() => {
      setError(validate(text));
    }, 1000);

    // If the value changes, clear the timeout that we had just set above.
    return () => clearTimeout(delayErrorCheck);
  }, [text]);

  return (
    <FormItem
      errorMessage={error}
      maxCharacters={maxCharacters}
      textBar={<TextBar hasError={!!error} placeholder={placeholder} />}
      value={text}
      {...props}
    />
  );
};

export default (props: ShortTextProps) => (
  <FormItemProvider>
    <ShortTextProvider>
      <ShortTextContent {...props} />
    </ShortTextProvider>
  </FormItemProvider>
);
