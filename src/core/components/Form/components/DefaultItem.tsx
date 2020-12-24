import React, { ReactElement } from 'react';

import { FormItemData } from '@components/Form/Form.types';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { takeFirst } from '@util/util';
import LongText from '../elements/LongText';
import MultipleChoice from '../elements/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from '../elements/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from '../elements/MultipleSelect/MultipleSelect';
import ShortText from '../elements/ShortText';
import Description from './Description';
import Label from './Label';

type BaseItemProps = Pick<FormItemData, 'category' | 'required' | 'title'>;

interface OptionItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'options'> {}

interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

export default ({
  category,
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
  const baseProps: BaseItemProps = { category, required, title };
  const optionProps: OptionItemProps = { ...baseProps, options };
  const textProps: TextItemProps = { ...baseProps, placeholder };

  const body: ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <ShortText {...textProps} />],
    [type === 'LONG_TEXT', <LongText {...textProps} />],
    [type === 'MULTIPLE_SELECT', <MultipleSelect {...optionProps} />],
    [
      type === 'MULTIPLE_CHOICE' && options.length >= 5,
      <MultipleChoiceDD {...optionProps} />
    ],
    [type === 'MULTIPLE_CHOICE', <MultipleChoice {...optionProps} />],
    [node]
  ]);

  return (
    <div className="c-form-item">
      <Label completed={completed} required={required}>
        {title}
      </Label>

      <Description>{description}</Description>
      {body}
      <ErrorMessage marginBottom={0} marginTop={8} message={errorMessage} />
    </div>
  );
};
