import day from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';

import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

const FormDate: React.FC<FormItemData> = ({ className, ...args }) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  const startDate = FormStore.useStoreState(
    ({ items }) => items.START_DATE?.value
  );

  useInitFormItem(args);

  const updateDate = (date: Date | [Date, Date]) => {
    setValue({ key: 'START_DATE', value: date });
    setValue({ key: 'END_DATE', value: date });
  };

  const minDate =
    key === 'END_DATE' && startDate ? day(startDate).toDate() : new Date();

  const css: string = cx('o-form-item--date', {}, className);

  return (
    <FormItemContainer className={css} {...args}>
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
