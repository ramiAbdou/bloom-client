/**
 * @fileoverview Components: Form
 * @author Rami Abdou
 */

import './Form.scss';

import React, { ReactElement } from 'react';

import Form from '@components/Form/Form.store';
import { FormItemData } from '@components/Form/Form.types';
import { makeClass, takeFirst } from '@util/util';
import LongText from './components/LongText';
import MultipleChoice from './components/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from './components/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from './components/MultipleSelect/MultipleSelect';
import ShortText from './components/ShortText';
import Label from './Label';

export default ({
  completed,
  description,
  errorMessage,
  node,
  options,
  required,
  title,
  type
}: FormItemData) => {
  const itemCSS = Form.useStoreState((store) => store.itemCSS);

  const baseProps: Partial<FormItemData> = { required, title };
  const optionProps: Partial<FormItemData> = { ...baseProps, options };

  const body: ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <ShortText {...baseProps} />],
    [type === 'LONG_TEXT', <LongText {...baseProps} />],
    [type === 'MULTIPLE_SELECT', <MultipleSelect {...optionProps} />],
    [
      type === 'MULTIPLE_CHOICE' && options.length >= 5,
      <MultipleChoiceDD {...optionProps} />
    ],
    [type === 'MULTIPLE_CHOICE', <MultipleChoice {...optionProps} />]
  ]);

  const css = makeClass([itemCSS, itemCSS, 'c-form-item']);

  return (
    <div className={css}>
      {title && (
        <Label completed={completed} required={required} title={title} />
      )}
      {description && <p className="c-form-desc">{description}</p>}
      {body ?? node}
      {errorMessage && <p className="c-form-error">{errorMessage}</p>}
    </div>
  );
};
