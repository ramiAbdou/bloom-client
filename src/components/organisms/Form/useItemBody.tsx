import React, { useMemo } from 'react';

import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import { FormItemData } from './Form.types';
import DropdownItem from './FormDropdown';
import FormLongText from './FormLongText';
import MultipleSelect from './FormMultipleSelect';
import FormShortText from './FormShortText';
import MultipleChoice from './MultipleChoice';

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
    children,
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
      <DropdownItem multiple {...optionProps} />
    ],
    [
      type === 'MULTIPLE_SELECT' && options.length < 5,
      <MultipleSelect {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options.length >= 5,
      <DropdownItem {...optionProps} />
    ],
    [
      type === 'MULTIPLE_CHOICE' && options.length < 5,
      <MultipleChoice {...optionProps} />
    ],
    children
  ]);

  return body;
};

export default useItemBody;
