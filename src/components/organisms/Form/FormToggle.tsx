import React from 'react';

import Toggle from '@molecules/Toggle/Toggle';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import useInitFormItem from './useInitFormItem';

const FormToggle: React.FC<FormItemData> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);
  useInitFormItem(args);

  const onChange = () => setValue({ key, value: !value });

  return <Toggle on={!!value} title={args?.title} onChange={onChange} />;
};

export default FormToggle;
