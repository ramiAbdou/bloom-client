import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

const FormDate: React.FC<FormItemData> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  const startDate = FormStore.useStoreState(
    ({ items }) => items.START_DATE?.value
  );

  useInitFormItem(args);
  const { id } = args;

  const updateDate = (date: Date | [Date, Date]) => {
    setValue({ key, value: date });
    if (id === 'START_DATE') setValue({ key: 'END_DATE', value: date });
  };

  const minDate =
    id === 'END_DATE' && startDate ? day(startDate).toDate() : new Date();

  return (
    <FormItemContainer className="o-form-item--date" {...args}>
      <DatePicker
        dateFormat="MMMM d, yyyy"
        minDate={minDate}
        placeholderText={`${day().format('MMMM D, YYYY')}`}
        selected={day(value).isValid() && day(value).toDate()}
        onChange={(date) => updateDate(date)}
      />
    </FormItemContainer>
  );
};

export default FormDate;
