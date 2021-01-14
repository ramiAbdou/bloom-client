import React, { useMemo } from 'react';

import { takeFirst } from '@util/util';
import {
  BaseItemProps,
  OptionItemProps,
  TextItemProps,
  UseItemBodyProps
} from './Form.types';
import FormDropdownItem from './FormDropdown';
import FormImageUpload from './FormImageUpload';
import FormLongText from './FormLongText';
import FormMultipleChoice from './FormMultipleChoice';
import FormMultipleSelect from './FormMultipleSelect';
import FormShortText from './FormShortText';
import FormToggle from './FormToggle';

/**
 * Returns the appropriate Form element (ie: ShortText, LongText) with the
 * appropriate props for the element based on the type and supplied props.
 */
const useItemBody = (props: UseItemBodyProps) => {
  const {
    category,
    id,
    plain,
    required,
    title,
    options,
    placeholder,
    type
  } = props;

  const baseProps: BaseItemProps = useMemo(
    () => ({ category, id, required, title }),
    [category, id, required, title]
  );

  const optionProps: OptionItemProps = useMemo(
    () => ({ ...baseProps, options, plain }),
    [options, plain]
  );

  const textProps: TextItemProps = useMemo(
    () => ({ ...baseProps, placeholder }),
    [placeholder]
  );

  const body: React.ReactElement = takeFirst([
    [type === 'SHORT_TEXT', <FormShortText {...textProps} />],
    [type === 'LONG_TEXT', <FormLongText {...textProps} />],
    [
      type === 'MULTIPLE_SELECT' && options.length >= 5,
      <FormDropdownItem multiple {...optionProps} />
    ],
    [
      type === 'MULTIPLE_SELECT' && options.length < 5,
      <FormMultipleSelect {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options.length >= 5,
      <FormDropdownItem {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options.length < 5,
      <FormMultipleChoice {...optionProps} />
    ],
    [type === 'TOGGLE', <FormToggle {...baseProps} />],
    [type === 'IMAGE', <FormImageUpload {...baseProps} />]
  ]);

  return body;
};

export default useItemBody;
