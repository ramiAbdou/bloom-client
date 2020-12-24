import React, { ReactElement, useEffect } from 'react';

import { FormItemData } from '@components/Form/Form.types';
import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import LongText from '../elements/LongText';
import MultipleChoice from '../elements/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from '../elements/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from '../elements/MultipleSelect/MultipleSelect';
import ShortText from '../elements/ShortText';
import Form from '../Form.store';
import Description from './Description';
import Label from './Label';

type BaseItemProps = Pick<FormItemData, 'category' | 'required' | 'title'>;

interface OptionItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'options'> {}

interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

interface FormItemProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'category'
      | 'completed'
      | 'description'
      | 'options'
      | 'placeholder'
      | 'required'
      | 'title'
      | 'type'
      | 'validate'
      | 'value'
    > {}

export default ({
  children,
  category,
  completed,
  description,
  options,
  required,
  placeholder,
  title,
  type,
  validate
}: FormItemProps) => {
  const setItem = Form.useStoreActions((store) => store.setItem);

  useEffect(() => {
    const emptyValue: string | string[] = takeFirst([
      [type === 'MULTIPLE_SELECT', []],
      [['SHORT_TEXT', 'LONG_TEXT'].includes(type), '']
    ]);

    setItem({
      category,
      completed,
      required,
      title,
      validate,
      value: emptyValue
    });
  }, []);

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
    children
  ]);

  return (
    <div className="c-form-item">
      <Label required={required}>{title}</Label>
      <Description>{description}</Description>
      {body}
      {/* <ErrorMessage marginBottom={0} marginTop={8} message={errorMessage} /> */}
    </div>
  );
};
