import React from 'react';

import Toggle from '@molecules/Toggle/Toggle';
import FormStore from './Form.store';
import { FormItemProps } from './Form.types';
import { getFormItemKey } from './Form.util';

const FormToggle: React.FC<Pick<FormItemProps, 'id' | 'title'>> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);
  const onChange = () => updateItem({ ...args, value: !value });

  return <Toggle on={!!value} title={args?.title} onChange={onChange} />;
};

export default FormToggle;
