import React from 'react';

import { takeFirst } from '@util/util';
import {
  BaseItemProps,
  OptionItemProps,
  TextItemProps,
  UseItemBodyProps
} from './Form.types';
import FormCoverImageUpload from './variants/FormCoverImageUpload';
import FormDropdown from './variants/FormDropdown';
import FormImageUpload from './variants/FormImageUpload';
import FormLongText from './variants/FormLongText';
import FormMultipleCardChoice from './variants/FormMultipleCardChoice';
import FormMultipleChoice from './variants/FormMultipleChoice';
import FormMultipleSelect from './variants/FormMultipleSelect';
import FormShortText from './variants/FormShortText';
import FormToggle from './variants/FormToggle';

/**
 * Returns the appropriate Form element (ie: ShortText, LongText) with the
 * appropriate props for the element based on the type and supplied props.
 */
const useItemBody = (props: UseItemBodyProps) => {
  const {
    category,
    card,
    cardOptions,
    children,
    id,
    plain,
    required,
    title,
    options,
    placeholder,
    type
  } = props;

  const baseProps: BaseItemProps = { category, id, required, title };
  const optionProps: OptionItemProps = { ...baseProps, options, plain };
  const cardOptionProps = { ...baseProps, card, cardOptions };
  const textProps: TextItemProps = { ...baseProps, placeholder };

  const body: React.ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <FormShortText {...textProps} />],
    [type === 'LONG_TEXT', <FormLongText {...textProps} />],
    [
      type === 'MULTIPLE_SELECT' && options.length >= 5,
      <FormDropdown multiple {...optionProps} />
    ],
    [
      type === 'MULTIPLE_SELECT' && options.length < 5,
      <FormMultipleSelect {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && card,
      <FormMultipleCardChoice {...cardOptionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options?.length < 5,
      <FormMultipleChoice {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options?.length >= 5,
      <FormDropdown {...optionProps} />
    ],
    [type === 'TOGGLE', <FormToggle {...baseProps} />],
    [type === 'IMAGE', <FormImageUpload {...baseProps} />],
    [type === 'COVER_IMAGE', <FormCoverImageUpload {...baseProps} />],
    [children, children]
  ]);

  return body;
};

export default useItemBody;
