import React, { useRef, useState } from 'react';

import Separator from '@atoms/Separator';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormLargeTitleProps extends FormItemData {
  placeholder?: string;
}

const FormLargeTitle: React.FC<FormLargeTitleProps> = ({
  placeholder,
  ...args
}) => {
  const [rows, setRows] = useState(1);

  const key = getFormItemKey(args);
  const error = FormStore.useStoreState(({ items }) => items[key]?.error);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  const ref: React.MutableRefObject<HTMLTextAreaElement> = useRef(null);
  useInitFormItem(args);

  const updateText = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRows(target?.scrollHeight / 30);
    setValue({ key, value: target.value });
  };

  const css = cx('o-form-item--large-title', {
    'o-form-item--large-title--error': !!error
  });

  return (
    <FormItemContainer {...args}>
      <textarea
        ref={ref}
        className={css}
        placeholder={placeholder}
        rows={rows}
        value={value ?? ''}
        onChange={updateText}
      />

      <Separator marginTop={0} />
    </FormItemContainer>
  );
};

export default FormLargeTitle;
