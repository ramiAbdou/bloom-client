/**
 * @fileoverview Components: Label
 * @author Rami Abdou
 */

import './Form.scss';

import React from 'react';

import CSSModifier from '@util/CSSModifier';

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

const LengthCount = ({ length, maxCharacters }: Partial<LabelProps>) => (
  <p className="c-form-label-count">
    {length} / {maxCharacters}
  </p>
);

export default ({ length, maxCharacters, required, title }: LabelProps) => {
  const { css } = new CSSModifier()
    .class('c-form-label')
    .addClass(required, 'c-form-label--required');

  return (
    <div className={css}>
      <p>{title}</p>

      {maxCharacters && length && (
        <LengthCount length={length} maxCharacters={maxCharacters} />
      )}
    </div>
  );
};
