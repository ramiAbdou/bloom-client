/**
 * @fileoverview Components: Form
 * @author Rami Abdou
 */

import './Form.scss';

import React from 'react';

import Form from '@components/Form/Form.store';
import { FormItemData } from '@components/Form/Form.types';
import CSSModifier from '@util/CSSModifier';
import LongText from './components/LongText/LongText';
import MultipleChoice from './components/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from './components/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from './components/MultipleSelect/MultipleSelect';
import ShortText from './components/ShortText/ShortText';

// There are 2 options for the label: 1) the standard Label tag or 2) if the
// component is a ShortText or LongText component and uses a character limit,
// then we use the LabelWithCharLimit, in which when the user begins typing,
// the character limit usage (ex: 42/80) will display across from the label.

type LabelProps = {
  length?: number;
  maxCharacters?: number;
  required: boolean;
  title: string;
};

const Label = ({ length, maxCharacters, required, title }: LabelProps) => {
  const showCount = maxCharacters && length;

  const { css } = new CSSModifier()
    .class('c-form-label')
    .addClass(required, 'c-form-label--required');

  return (
    <div className="c-form-label-ctr">
      <p className={css}>{title}</p>

      {showCount && (
        <p className="c-form-label--count">
          {length} / {maxCharacters}
        </p>
      )}
    </div>
  );
};

type TextProps = { message: string };

const Description = ({ message }: TextProps) => (
  <p className="c-form-desc">{message}</p>
);

const ErrorMessage = ({ message }: TextProps) => (
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
  const dropdownProps = { ...baseProps, options };
  const textProps = { ...baseProps, maxCharacters, placeholder };

  let body = null;

  if (type === 'SHORT_TEXT') body = <ShortText {...textProps} />;
  else if (type === 'LONG_TEXT') body = <LongText {...textProps} />;
  else if (type === 'MULTIPLE_SELECT')
    body = <MultipleSelect {...dropdownProps} />;
  else if (type === 'MULTIPLE_CHOICE') {
    if (options.length >= 5) body = <MultipleChoiceDD {...dropdownProps} />;
    else body = <MultipleChoice {...dropdownProps} />;
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
