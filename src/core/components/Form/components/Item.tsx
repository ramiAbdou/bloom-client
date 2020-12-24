import React, { ReactElement } from 'react';

import { FormItemData } from '@components/Form/Form.types';
import { takeFirst } from '@util/util';
import LongText from '../elements/LongText';
import MultipleChoice from '../elements/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from '../elements/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from '../elements/MultipleSelect/MultipleSelect';
import ShortText from '../elements/ShortText';
import Label from './Label';

export default ({
  completed,
  description,
  errorMessage,
  node,
  options,
  placeholder,
  required,
  title,
  type
}: FormItemData) => {
  const baseProps: Partial<FormItemData> = { required, title };
  const optionProps: Partial<FormItemData> = { ...baseProps, options };
  const textProps: Partial<FormItemData> = { ...baseProps, placeholder };

  const body: ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <ShortText {...textProps} />],
    [type === 'LONG_TEXT', <LongText {...textProps} />],
    [type === 'MULTIPLE_SELECT', <MultipleSelect {...optionProps} />],
    [
      type === 'MULTIPLE_CHOICE' && options.length >= 5,
      <MultipleChoiceDD {...optionProps} />
    ],
    [type === 'MULTIPLE_CHOICE', <MultipleChoice {...optionProps} />]
  ]);

  return (
    <div className="c-form-item">
      {title && (
        <Label completed={completed} required={required} title={title} />
      )}
      {description && <p className="c-form-desc">{description}</p>}
      {body ?? node}
      {errorMessage && <p className="c-form-error">{errorMessage}</p>}
    </div>
  );
};
