import React, { useMemo } from 'react';

import { ChildrenProps } from '@constants';
import { takeFirst } from '@util/util';
import LongText from '../elements/LongText';
import MultipleChoice from '../elements/MultipleChoice/MultipleChoice';
import MultipleChoiceDD from '../elements/MultipleChoice/MultipleChoiceDD';
import MultipleSelect from '../elements/MultipleSelect/MultipleSelect';
import ShortText from '../elements/ShortText';
import { FormItemData } from '../Form.types';

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
export default function useItemBody(props: UseItemBodyProps) {
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
}