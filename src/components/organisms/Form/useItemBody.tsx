import React, { useMemo } from 'react';

import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import { FormItemData } from './Form.types';
import FormDropdownItem from './FormDropdown';
import FormLongText from './FormLongText';
import FormMultipleChoice from './FormMultipleChoice';
import FormMultipleSelect from './FormMultipleSelect';
import FormShortText from './FormShortText';
import FormToggle from './FormToggle';

type BaseItemProps = Pick<FormItemData, 'category' | 'required' | 'title'>;

interface OptionItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'options'> {}

interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

interface UseItemBodyProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'category'
      | 'id'
      | 'options'
      | 'placeholder'
      | 'plain'
      | 'required'
      | 'title'
      | 'type'
    > {}

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
    [type === 'TOGGLE', <FormToggle {...baseProps} />]
  ]);

  return body;
};

export default useItemBody;
