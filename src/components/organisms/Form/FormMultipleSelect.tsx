import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import FormStore from './Form.store';
import { FormItemProps } from './Form.types';
import { getFormItemKey } from './Form.util';

const FormMultipleSelect: React.FC<
  Pick<FormItemProps, 'id' | 'options' | 'plain' | 'title'>
> = ({ options, plain, ...args }) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  if (!options) return null;

  return (
    <div className="c-misc-checkbox-ctr">
      {options.map((option: string) => {
        const onChange = () => {
          const updatedValue = value?.includes(option)
            ? value.filter((element) => element !== option)
            : [...value, option];

          updateItem({ ...args, value: updatedValue });
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
  );
};

export default FormMultipleSelect;
