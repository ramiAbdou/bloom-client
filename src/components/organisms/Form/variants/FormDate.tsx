import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import FormStore from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormDate: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ ...queryArgs }) => {
  const { id } = queryArgs;

  const value = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.value
  );

  const startDate = FormStore.useStoreState(
    ({ getItem }) => getItem({ id: 'START_DATE' })?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateDate = (date: Date | [Date, Date]) => {
    updateItem({ ...queryArgs, value: date });
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
