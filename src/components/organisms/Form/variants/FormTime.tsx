import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import FormStore from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormTime: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ ...queryArgs }) => {
  const { id } = queryArgs;

  const value = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateDate = (date: Date | [Date, Date]) => {
    updateItem({ ...queryArgs, value: date });
  };

  return (
    <DatePicker
      showTimeSelect
      showTimeSelectOnly
      dateFormat="h:mm a"
      minDate={new Date()}
      placeholderText={`${day()
        .add(id === 'END_TIME' ? 2 : 1, 'hour')
        .startOf('hour')
        .format('h:mm A')}`}
      selected={day(value).isValid() && day(value).toDate()}
      onChange={(date) => updateDate(date)}
    />
  );
};

export default FormTime;
