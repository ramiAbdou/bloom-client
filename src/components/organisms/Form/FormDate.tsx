import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import useInitFormItem from './useInitFormItem';

const FormDate: React.FC<FormItemData> = (args) => {
  const { id } = args;

  const key = getFormItemKey(args);

  const value = FormStore.useStoreState(({ items }) => items[key]?.value);

  const startDate = FormStore.useStoreState(
    ({ items }) => items.START_DATE?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  useInitFormItem(args);

  const updateDate = (date: Date | [Date, Date]) => {
    updateItem({ ...args, value: date });
    if (id === 'START_DATE') updateItem({ id: 'END_DATE', value: date });
  };

  const minDate =
    id === 'END_DATE' && startDate ? day(startDate).toDate() : new Date();

  return (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      minDate={minDate}
      placeholderText={`${day().format('MMMM D, YYYY')}`}
      selected={day(value).isValid() && day(value).toDate()}
      onChange={(date) => updateDate(date)}
    />
  );
};

export default FormDate;
