import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { FormItemData } from '@organisms/Form/Form.types';
import FormStore from './Form.store';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

const FormTime: React.FC<FormItemData> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  const endDate = FormStore.useStoreState(({ items }) => items.END_DATE?.value);

  const startTime = FormStore.useStoreState(
    ({ items }) => items.START_TIME?.value
  );

  useInitFormItem(args);

  const updateDate = (date: Date | [Date, Date]) => {
    setValue({ key, value: date });

    if (args?.id !== 'START_TIME') return;

    setValue({
      key: 'END_TIME',
      value: day(date as Date)
        .add(1, 'hour')
        .toDate()
    });
  };

  let minTime: Date;

  if (args?.id === 'END_TIME') {
    if (startTime) minTime = day(startTime).add(30, 'minute').toDate();
    else {
      const endOfYesterday = day().subtract(1, 'day').endOf('day');
      if (day(endDate).isAfter(endOfYesterday)) {
        minTime = day().startOf('day').toDate();
      }
    }
  } else minTime = new Date();

  const placeholderText = day()
    .add(args?.id === 'END_TIME' ? 2 : 1, 'hour')
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
