import React from 'react';

import Toggle from '@molecules/Toggle/Toggle';
import Form from './Form.store';
import { FormItemProps } from './Form.types';

const FormToggle: React.FC<Pick<FormItemProps, 'id' | 'title'>> = (props) => {
  const value = Form.useStoreState(({ getItem }) => getItem(props)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const onChange = () => updateItem({ ...props, value: !value });
  const { title } = props;

  return <Toggle on={!!value} title={title} onChange={onChange} />;
};

export default FormToggle;
