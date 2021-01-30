import React from 'react';

import { takeFirst } from '@util/util';
import { BaseItemProps, OptionItemProps, UseItemBodyProps } from './Form.types';
import FormCoverImageUpload from './FormCoverImageUpload';
import FormDate from './FormDate';
import FormDropdown from './FormDropdown';
import FormImageUpload from './FormImageUpload';
import FormLargeTitle from './FormLargeTitle';
import FormLongText from './FormLongText';
import FormMultipleChoice from './FormMultipleChoice';
import FormMultipleSelect from './FormMultipleSelect';
import FormShortText from './FormShortText';
import FormTime from './FormTime';
import FormToggle from './FormToggle';

/**
 * Returns the appropriate Form element (ie: ShortText, LongText) with the
 * appropriate props for the element based on the type and supplied props.
 */
const useItemBody = (props: UseItemBodyProps) => {
  const {
    category,
    children,
    id,
    plain,
    required,
    title,
    options,
    type
  } = props;

  const baseProps: BaseItemProps = { category, id, required, title };

  const optionProps: OptionItemProps = {
    ...baseProps,
    options,
    plain
  };

  const body: React.ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <FormShortText {...baseProps} />],
    [type === 'LONG_TEXT', <FormLongText {...baseProps} />],
    [
      type === 'MULTIPLE_SELECT' && options.length >= 5,
      <FormDropdown multiple {...optionProps} />
    ],
    [
      type === 'MULTIPLE_SELECT' && options.length < 5,
      <FormMultipleSelect {...optionProps} />
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
    [type === 'LARGE_TITLE', <FormLargeTitle {...baseProps} />],
    [type === 'DATE', <FormDate {...baseProps} />],
    [type === 'TIME', <FormTime {...baseProps} />],
    [children, children]
  ]);

  return body;
};

export default useItemBody;
