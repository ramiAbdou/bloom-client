import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { FormItemData, FormState } from '@components/organisms/Form/Form.types';
import { cx } from '@util/util';
import { useForm, useFormItem, useFormSelector } from './Form.state';
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
  const startDate: string = useFormItem('START_DATE')?.value as string;
  const startTime: string = useFormItem('START_TIME')?.value as string;

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
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const value: string = useFormItem(key)?.value as string;

  const disabled: boolean = useFormSelector(({ items }: FormState) => {
    if (key === 'END_TIME') return !items.START_TIME?.value;
    return !items.START_DATE?.value;
  });

  useInitFormItem(args);
  const minTime = useMinTime(key);

  const updateDate = (date: Date | [Date, Date]) => {
    if (key === 'START_TIME') {
      formDispatch({ key: 'START_TIME', type: 'SET_VALUE', value: date });

      const endTime = day(date as Date)
        .add(1, 'hour')
        .toDate();

      formDispatch({ key: 'END_TIME', type: 'SET_VALUE', value: endTime });
    } else formDispatch({ key: 'END_TIME', type: 'SET_VALUE', value: date });
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
