/**
 * @fileoverview Component: LongText
 * - Long text textarea that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { useEffect, useRef } from 'react';

import { addModifier } from '@util/util';
import { LongTextProps, TextBarProps } from '../../Form.types';
import FormItem from '../FormItem/FormItem';
import FormItemProvider, { useFormItem } from '../FormItem/FormItem.state';
import { LongTextProvider, useLongText } from './LongText.state';

const TextBar = ({ placeholder }: TextBarProps) => {
  const { activate, isActive } = useFormItem();
  const { text, updateText } = useLongText();

  const textareaRef: React.MutableRefObject<HTMLTextAreaElement> = useRef(null);
  const className: string = addModifier('c-form-input--lg', isActive);

  return (
    <button className={className}>
      <textarea
        ref={textareaRef}
        className="c-form-input--lg__txt"
        placeholder={text || placeholder || ''}
        style={{ resize: 'none' }}
        value={text}
        onChange={({ target }) => updateText(target.value)}
        onClick={activate}
      />
    </button>
  );
};

// -----------------------------------------------------------------------------

const LongTextContent = ({
  initialValue,
  maxCharacters,
  placeholder,
  ...props
}: LongTextProps) => {
  const { initializeValue, text, setMaxCharacters } = useLongText();

  useEffect(() => {
    initializeValue(initialValue);
    setMaxCharacters(maxCharacters);
  }, []);

  return (
    <FormItem
      maxCharacters={maxCharacters}
      textBar={<TextBar placeholder={placeholder} />}
      value={text}
      {...props}
    />
  );
};

export default (props: LongTextProps) => (
  <FormItemProvider>
    <LongTextProvider>
      <LongTextContent {...props} />
    </LongTextProvider>
  </FormItemProvider>
);
