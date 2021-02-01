import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { FormItemData } from '@organisms/Form/Form.types';
import FormStore from './Form.store';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

const useMinTime = (id: string) => {
  const startDate = FormStore.useStoreState(
    ({ items }) => items.START_DATE?.value
  );

  const endDate = FormStore.useStoreState(({ items }) => items.END_DATE?.value);

  const startTime = FormStore.useStoreState(
    ({ items }) => items.START_TIME?.value
  );

  let minTime: Date;

  const endOfYesterday = day().subtract(1, 'day').endOf('day');

  if (id === 'END_TIME') {
    if (startTime) minTime = day(startTime).add(30, 'minute').toDate();
    else if (endDate && day(endDate).isAfter(endOfYesterday)) {
      minTime = day().startOf('day').toDate();
    }
  } else if (id === 'START_TIME') {
    if (startDate && day(startDate).isAfter(endOfYesterday)) {
      minTime = day().startOf('day').toDate();
    }
  } else minTime = new Date();

  return minTime;
};

const FormTime: React.FC<FormItemData> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  useInitFormItem(args);
  const { id } = args;

  const updateDate = (date: Date | [Date, Date]) => {
    setValue({ key, value: date });

    if (id !== 'START_TIME') return;

    setValue({
      key: 'END_TIME',
      value: day(date as Date)
        .add(1, 'hour')
        .toDate()
    });
  };

  const minTime = useMinTime(id);

  const placeholderText = day()
    .add(id === 'END_TIME' ? 2 : 1, 'hour')
    .startOf('hour')
    .format('h:mm A');

  return (
    <FormItemContainer className="o-form-item--date" {...args}>
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
    </FormItemContainer>
  );
};

export default FormTime;
