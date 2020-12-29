import React from 'react';

import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import LongText from './elements/LongText';
import MultipleChoice from './elements/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from './elements/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from './elements/MultipleSelect/MultipleSelect';
import ShortText from './elements/ShortText';
import { FormItemData } from './Form.types';

/**
 * Formats the given questions into valid Form items by adding the additional
 * properties and initializing the values for each question.
 *
 * @param questions Questions to format into items.
 */
export const formatQuestions = (questions: FormItemData[]) => {
  if (!questions) return [];

  return questions.map(
    ({ options, type, value, ...question }: Partial<FormItemData>) => {
      const emptyValue: string | string[] =
        type === 'MULTIPLE_SELECT' ? [] : '';

      return { ...question, options, type, value: value ?? emptyValue };
    }
  );
};

type BaseItemProps = Pick<FormItemData, 'category' | 'required' | 'title'>;

interface OptionItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'options'> {}

interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

interface GetItemBodyProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      'category' | 'options' | 'placeholder' | 'required' | 'title' | 'type'
    > {}

/**
 * Returns the appropriate Form element (ie: ShortText, LongText) with the
 * appropriate props for the element based on the type and supplied props.
 */
export const getItemBody = ({
  category,
  children,
  required,
  title,
  options,
  placeholder,
  type
}: GetItemBodyProps) => {
  const baseProps: BaseItemProps = { category, required, title };
  const optionProps: OptionItemProps = { ...baseProps, options };
  const textProps: TextItemProps = { ...baseProps, placeholder };

  const body: React.ReactElement = takeFirst([
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

  return body;
};

/**
 * All GraphQL requests with data should have the data be populated in an array,
 * even if the question is not MULTIPLE_SELECT. This helps with parsing
 * consistency.
 *
 * This function ensures that all values are returned as arrays.
 */
export const parseValue = (value: any) => {
  if (!value) return null;

  const isArray = Array.isArray(value);
  if (
    isArray &&
    value.length === 1 &&
    ['None', 'None of the Above', 'N/A'].includes(value[0])
  ) {
    return [];
  }

  return isArray ? value : [value];
};
