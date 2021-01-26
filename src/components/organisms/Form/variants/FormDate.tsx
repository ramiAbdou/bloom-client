import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import FormStore from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormDate: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ ...queryArgs }) => {
  const value = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateDate = (date: Date | [Date, Date]) => {
    updateItem({ ...queryArgs, value: date });
  };

  return (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      minDate={new Date()}
      placeholderText={`${day().format('MMMM D, YYYY')}`}
      selected={day(value).isValid() && day(value).toDate()}
      onChange={(date) => updateDate(date)}
    />
  );
};

export default FormDate;
