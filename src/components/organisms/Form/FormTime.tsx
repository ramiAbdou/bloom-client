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

  const startTime = FormStore.useStoreState(
    ({ items }) => items.START_TIME?.value
  );

  useInitFormItem(args);

  const updateDate = (date: Date | [Date, Date]) => {
    setValue({ key, value: date });

    if (args?.id === 'START_TIME') {
      setValue({
        key: 'END_TIME',
        value: day(date as Date)
          .add(1, 'hour')
          .toDate()
      });
    }
  };

  const minTime =
    args?.id === 'END_TIME' && startTime
      ? day(startTime).add(30, 'minute').toDate()
      : new Date();

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
