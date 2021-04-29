import { useEffect } from 'react';

import { QuestionType } from '@util/constants';
import { useForm } from './Form.state';
import { FormItemData } from './Form.types';

const useInitFormItem = (props: FormItemData): void => {
  const [, formDispatch] = useForm();

  const { required, type, value } = props;

  useEffect(() => {
    const emptyValue =
      (type === QuestionType.MULTIPLE_SELECT && []) ||
      (type === QuestionType.TOGGLE && false) ||
      '';

    formDispatch({
      item: {
        ...props,
        required: required ?? true,
        value: value ?? emptyValue
      },
      type: 'SET_ITEM'
    });
  }, []);
};

export default useInitFormItem;
