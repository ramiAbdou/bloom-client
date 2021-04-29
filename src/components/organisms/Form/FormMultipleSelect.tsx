import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import Show from '@components/containers/Show';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormMultipleChoiceProps extends FormItemData {
  // Only used in MULTIPLE_SELECT. True if checkbox shoudln't have an attribute
  // tag associated with it.
  plain?: boolean;
}

const FormMultipleSelect: React.FC<FormMultipleChoiceProps> = ({
  plain,
  show,
  ...args
}) => {
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const value: string[] = useFormItem(key)?.value as string[];

  useInitFormItem(args);

  return (
    <Show show={show}>
      <FormItemContainer {...args}>
        <div className="c-misc-checkbox-ctr">
          {args?.options.map((option: string) => {
            const onChange = () => {
              const updatedValue = value?.includes(option)
                ? value.filter((element) => element !== option)
                : [...value, option];

              formDispatch({ key, type: 'SET_VALUE', value: updatedValue });
            };

            return (
              <Checkbox
                key={option}
                checked={value?.includes(option)}
                plain={plain}
                title={option}
                onChange={onChange}
              />
            );
          })}
        </div>
      </FormItemContainer>
    </Show>
  );
};

export default FormMultipleSelect;
