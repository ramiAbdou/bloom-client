/**
 * @fileoverview Component: FormItem
 * - Form item wrapper component that will be used for all components.
 * @author Rami Abdou
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { addModifier } from '@util/util';
import { FormItemProps } from '../../Form.types';
import { useFormItem } from './FormItem.state';

/*
  _         _         _
 | |   __ _| |__  ___| |
 | |__/ _` | '_ \/ -_) |
 |____\__,_|_.__/\___|_|
*/

// There are 2 options for the label: 1) the standard Label tag or 2) if the
// component is a ShortText or LongText component and uses a character limit,
// then we use the LabelWithCharLimit, in which when the user begins typing,
// the character limit usage (ex: 42/80) will display across from the label.

type LabelProps = {
  length?: number;
  maxCharacters: number;
  onClick?: VoidFunction;
  required?: boolean;
};

export const Label = ({
  length,
  maxCharacters,
  onClick,
  required
}: LabelProps) => {
  const { id, inactivate } = useFormItem();
  const className = addModifier('c-form-label', required, 'required');
  const showCount = maxCharacters && length;

  return (
    <div className="c-form-label-ctr" onClick={inactivate}>
      <p className={className} onClick={onClick ?? inactivate}>
        {id}
      </p>

      {showCount && (
        <p className="c-form-label--count">
          {length} / {maxCharacters}
        </p>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------

const Description = ({ message }) => <p className="c-form-desc">{message}</p>;
const ErrorMessage = ({ message }) => <p className="c-form-error">{message}</p>;

// -----------------------------------------------------------------------------

export default ({
  description,
  errorMessage,
  id,
  maxCharacters,
  onClickOutside,
  required,
  textBar,
  value
}: FormItemProps) => {
  const { inactivate, isActive, setId } = useFormItem();

  useEffect(() => setId(id), [id]);

  // If the user clicks outside of the form item, inactive all the FormItem's.
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const handleClickOutside = () => {
    if (onClickOutside) onClickOutside();
    inactivate();
  };

  useOnClickOutside(ref, () => isActive && handleClickOutside());

  return (
    <div className="c-form-item">
      <Label
        length={value ? value.length : null}
        maxCharacters={maxCharacters}
        required={required}
        onClick={handleClickOutside}
      />

      {description && <Description message={description} />}
      <div ref={ref}>{textBar}</div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
