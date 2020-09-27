/**
 * @fileoverview Component: SignupFormItem
 * @author Rami Abdou
 */

import React from 'react';

import {
  Dropdown,
  DropdownMultiple,
  LongText,
  ShortText
} from '@components/Form';
import { FormItem, FormQuestionType } from '@constants';

// -----------------------------------------------------------------------------

export default ({ description, options, required, title, type }: FormItem) => {
  const baseProps = { description, id: title, required };

  if (type === FormQuestionType.SHORT_TEXT) return <ShortText {...baseProps} />;
  if (type === FormQuestionType.LONG_TEXT) return <LongText {...baseProps} />;
  if (type === FormQuestionType.DROPDOWN)
    return <Dropdown options={options} {...baseProps} />;
  if (type === FormQuestionType.DROPDOWN_MULTIPLE)
    return (
      <DropdownMultiple
        initialValues={[]}
        options={options.map((value) => ({ value }))}
        {...baseProps}
      />
    );

  return null;
};
