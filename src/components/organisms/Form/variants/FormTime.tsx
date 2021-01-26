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

  const startTime = FormStore.useStoreState(
    ({ getItem }) => getItem({ id: 'START_TIME' })?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateDate = (date: Date | [Date, Date]) => {
    updateItem({ ...queryArgs, value: date });

    if (id === 'START_TIME') {
      updateItem({
        id: 'END_TIME',
        value: day(date as Date)
          .add(1, 'hour')
          .toDate()
      });
    }
  };

  const minTime =
    id === 'END_TIME' && startTime
      ? day(startTime).add(30, 'minute').toDate()
      : new Date();

  const placeholderText = day()
    .add(id === 'END_TIME' ? 2 : 1, 'hour')
    .startOf('hour')
    .format('h:mm A');

  return (
    <DatePicker
      showTimeSelect
      showTimeSelectOnly
      dateFormat="h:mm a"
      maxTime={day().endOf('day').toDate()}
      minTime={minTime}
      placeholderText={placeholderText}
      selected={day(value).isValid() && day(value).toDate()}
      onChange={(date) => updateDate(date)}
    />
  );
};

export default FormTime;
