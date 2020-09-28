/**
 * @fileoverview Components: Form
 * @author Rami Abdou
 */

import React, { useRef } from 'react';

import { FormQuestionType } from '@constants';
import ShortText from './components/ShortText/ShortText';
import { FormItemData } from './Form.types';

// There are 2 options for the label: 1) the standard Label tag or 2) if the
// component is a ShortText or LongText component and uses a character limit,
// then we use the LabelWithCharLimit, in which when the user begins typing,
// the character limit usage (ex: 42/80) will display across from the label.

type LabelProps = { length?: number; maxCharacters?: number; title: string };

const Label = ({ length, maxCharacters, title }: LabelProps) => {
  const showCount = maxCharacters && length;

  return (
    <div className="c-form-label-ctr">
      <p className="c-form-label">{title}</p>

      {showCount && (
        <p className="c-form-label--count">
          {length} / {maxCharacters}
        </p>
      )}
    </div>
  );
};

const Description = ({ message }) => <p className="c-form-desc">{message}</p>;

const ErrorMessage = ({ message }) => <p className="c-form-error">{message}</p>;

export default ({
  description,
  errorMessage,
  maxCharacters,
  title,
  type,
  validate
}: FormItemData) => {
  const ref = useRef(null);

  const baseProps = { maxCharacters, title, validate };

  let body = null;
  if (type === FormQuestionType.SHORT_TEXT) body = <ShortText {...baseProps} />;

  return (
    <div ref={ref} className="c-form-item">
      <Label title={title} />
      {description && <Description message={description} />}
      {body}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
