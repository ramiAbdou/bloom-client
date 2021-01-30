import { useEffect } from 'react';

import FormStore from './Form.store';
import { FormItemProps } from './Form.types';

const useInitFormItem = ({
  category,
  id,
  required,
  title,
  type,
  validate,
  value
}: FormItemProps) => {
  const setItem = FormStore.useStoreActions((store) => store.setItem);

  useEffect(() => {
    const emptyValue =
      (type === 'MULTIPLE_SELECT' && []) || (type === 'TOGGLE' && false) || '';

    value = value ?? emptyValue;

    setItem({
      category,
      id,
      initialValue: value,
      required: required ?? true,
      title,
      type,
      validate,
      value
    });
  }, []);
};

export default useInitFormItem;
