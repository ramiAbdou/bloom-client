import React from 'react';

import { FormItemProps } from './Form.types';
import FormDropdown from './FormDropdown';
import FormLongText from './FormLongText';
import FormMultipleChoice from './FormMultipleChoice';
import FormShortText from './FormShortText';

const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { options, type } = props;

  if (type === 'SHORT_TEXT') return <FormShortText {...props} />;
  if (type === 'LONG_TEXT') return <FormLongText {...props} />;
  if (type === 'MULTIPLE_CHOICE') {
    if (options.length < 5) return <FormMultipleChoice {...props} />;
    return <FormDropdown {...props} />;
  }

  return null;
};

export default FormItem;
