import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { FormItemData } from '@components/organisms/Form/Form.types';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

/**
 * Returns the minimum time that is selectable for the FormTime component.
 * If the START_DATE is today, then minimum time is right now. If the
 * START_DATE is after today, the minimum time is the start of the day AKA
 * midnight.
 */
const useMinTime = (key: string) => {
  const startDate = FormStore.useStoreState(
    ({ items }) => items.START_DATE?.value
  );

  const startTime = FormStore.useStoreState(
    ({ items }) => items.START_TIME?.value
  );

  const startOfToday = day().startOf('day');

  if (key === 'END_TIME' && !startTime) return null;
  if (key === 'END_TIME') {
    return day(startTime as string)
      .add(30, 'minute')
      .toDate();
  }
  if (key === 'START_TIME' && !startDate) return null;
  if (key === 'START_TIME' && day(startDate as string).isAfter(startOfToday)) {
    return day().startOf('day').toDate();
  }

  return new Date();
};

const FormTime: React.FC<FormItemData> = ({ className, ...args }) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((state) => state.setValue);

  const disabled: boolean = FormStore.useStoreState(({ items }) => {
    if (key === 'END_TIME') return !items.START_TIME?.value;
    return !items.START_DATE?.value;
  });

  useInitFormItem(args);
  const minTime = useMinTime(key);

  const updateDate = (date: Date | [Date, Date]) => {
    if (key === 'START_TIME') {
      setValue({ key: 'START_TIME', value: date });

      const endTime = day(date as Date)
        .add(1, 'hour')
        .toDate();

      setValue({ key: 'END_TIME', value: endTime });
    } else setValue({ key: 'END_TIME', value: date });
  };

  const placeholderText = day()
    .add(key === 'END_TIME' ? 2 : 1, 'hour')
    .startOf('hour')
    .format('h:mm A');

  const css: string = cx('o-form-item--date', {}, className);

  return (
    <FormItemContainer className={css} {...args}>
      <DatePicker
        showTimeSelect
        showTimeSelectOnly
        dateFormat="h:mm a"
        disabled={disabled}
        maxTime={day().endOf('day').toDate()}
        minTime={minTime}
        placeholderText={placeholderText}
        selected={
          day(value as string).isValid() && day(value as string).toDate()
        }
        onChange={(date) => updateDate(date)}
      />
    </FormItemContainer>
  );
};

export default FormTime;
