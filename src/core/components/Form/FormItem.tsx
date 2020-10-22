/**
 * @fileoverview Components: Form
 * @author Rami Abdou
 */

import React from 'react';

import CSSModifier from '@util/CSSModifier';
import Dropdown from './components/Dropdown';
import DropdownMultiple from './components/DropdownMultiple';
import LongText from './components/LongText';
import ShortText from './components/ShortText';
import { FormItemData } from './FormTypes';

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
  required,
  title,
  type
}: FormItemData) => {
  const baseProps = { required, title };
  const dropdownProps = { ...baseProps, options };
  const textProps = { ...baseProps, maxCharacters };

  let body = null;

  if (type === 'MULTIPLE_CHOICE') console.log(options);

  if (type === 'SHORT_TEXT') body = <ShortText {...textProps} />;
  else if (type === 'LONG_TEXT') body = <LongText {...textProps} />;
  else if (type === 'MULTIPLE_SELECT')
    body = <DropdownMultiple {...dropdownProps} />;
  else if (type === 'MULTIPLE_CHOICE') body = <Dropdown {...dropdownProps} />;

  return (
    <div className="c-form-item">
      <Label required={required} title={title} />
      {description && <Description message={description} />}
      {body}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
