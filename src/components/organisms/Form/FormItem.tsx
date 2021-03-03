import React from 'react';

import { QuestionType } from '@util/constants';
import { FormItemData } from './Form.types';
import FormCoverImage from './FormCoverImage';
import FormDropdown from './FormDropdown';
import FormImage from './FormImage';
import FormLongText from './FormLongText';
import FormMultipleChoice from './FormMultipleChoice';
import FormMultipleSelect from './FormMultipleSelect';
import FormShortText from './FormShortText';

const FormItem: React.FC<FormItemData> = (props: FormItemData) => {
  const { options, type } = props;

  if (type === QuestionType.COVER_IMAGE) return <FormCoverImage {...props} />;
  if (type === QuestionType.IMAGE) return <FormImage {...props} />;
  if (type === QuestionType.LONG_TEXT) return <FormLongText {...props} />;

  if (type === QuestionType.MULTIPLE_CHOICE) {
    if (options.length < 5) return <FormMultipleChoice {...props} />;
    return <FormDropdown {...props} />;
  }

  if (type === QuestionType.MULTIPLE_SELECT) {
    if (options.length < 5) return <FormMultipleSelect {...props} />;
    return <FormDropdown multiple {...props} />;
  }

  if (type === QuestionType.SHORT_TEXT) return <FormShortText {...props} />;

  return null;
};

export default FormItem;
