import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { cx } from '@util/util';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

const FormDate: React.FC<FormItemData> = ({ className, ...args }) => {
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const value: string = useFormItem(key)?.value as string;
  const startDate: string = useFormItem('START_DATE')?.value as string;

  useInitFormItem(args);

  const updateDate = (date: Date | [Date, Date]) => {
    formDispatch({ key: 'START_DATE', type: 'SET_VALUE', value: date });
    formDispatch({ key: 'END_DATE', type: 'SET_VALUE', value: date });
  };

  const minDate =
    key === 'END_DATE' && startDate
      ? day(startDate as string).toDate()
      : new Date();

  const css: string = cx('o-form-item--date', {}, className);

  return (
    <FormItemContainer className={css} {...args}>
      <DatePicker
        dateFormat="MMMM d, yyyy"
        minDate={minDate}
        placeholderText={`${day().format('MMMM D, YYYY')}`}
        selected={
          day(value as string).isValid() && day(value as string).toDate()
        }
        onChange={(date) => updateDate(date)}
      />
    </FormItemContainer>
  );
};

export default FormDate;
