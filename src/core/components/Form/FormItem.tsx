/**
 * @fileoverview Components: Form
 * @author Rami Abdou
 */

import './Form.scss';

import React, { ReactElement } from 'react';

import Form from '@components/Form/Form.store';
import { FormItemData } from '@components/Form/Form.types';
import { MessageProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import LongText from './components/LongText/LongText';
import MultipleChoice from './components/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from './components/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from './components/MultipleSelect/MultipleSelect';
import ShortText from './components/ShortText/ShortText';
import Label from './Label';

const Description = ({ message }: MessageProps) => (
  <p className="c-form-desc">{message}</p>
);

const ErrorMessage = ({ message }: MessageProps) => (
  <p className="c-form-error">{message}</p>
);

// -----------------------------------------------------------------------------

export default ({
  description,
  errorMessage,
  maxCharacters,
  options,
  placeholder,
  required,
  title,
  type
}: FormItemData) => {
  const itemCSS = Form.useStoreState((store) => store.itemCSS);

  const baseProps = { required, title };
  const optionProps = { ...baseProps, options };
  const textProps = { ...baseProps, maxCharacters, placeholder };

  let body: ReactElement = null;

  if (type === 'SHORT_TEXT') body = <ShortText {...textProps} />;
  else if (type === 'LONG_TEXT') body = <LongText {...textProps} />;
  else if (type === 'MULTIPLE_SELECT')
    body = <MultipleSelect {...optionProps} />;
  else if (type === 'MULTIPLE_CHOICE') {
    if (options.length >= 5) body = <MultipleChoiceDD {...optionProps} />;
    else body = <MultipleChoice {...optionProps} />;
  }

  const { css } = new CSSModifier().addClass(!!itemCSS, itemCSS, 'c-form-item');

  return (
    <div className={css}>
      {!placeholder && <Label required={required} title={title} />}
      {description && <Description message={description} />}
      {body}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
