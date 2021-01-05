import React, { useMemo } from 'react';

import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import DropdownItem from './Dropdown';
import { FormItemData } from './Form.types';
import FormLongText from './FormLongText';
import FormShortText from './FormShortText';
import MultipleChoice from './MultipleChoice';
import MultipleSelect from './MultipleSelect';

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
      'category' | 'options' | 'placeholder' | 'required' | 'title' | 'type'
    > {}

/**
 * Returns the appropriate Form element (ie: ShortText, LongText) with the
 * appropriate props for the element based on the type and supplied props.
 */
const useItemBody = (props: UseItemBodyProps) => {
  const {
    category,
    children,
    required,
    title,
    options,
    placeholder,
    type
  } = props;

  const baseProps: BaseItemProps = useMemo(
    () => ({ category, required, title }),
    [category, required, title]
  );

  const optionProps: OptionItemProps = useMemo(
    () => ({ ...baseProps, options }),
    [options]
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
