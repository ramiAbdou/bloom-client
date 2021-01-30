import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import Form from './Form.store';
import { FormItemProps } from './Form.types';

const FormMultipleSelect: React.FC<
  Pick<FormItemProps, 'id' | 'options' | 'plain' | 'title'>
> = ({ options, plain, ...queryArgs }) => {
  const value = Form.useStoreState(({ getItem }) => getItem(queryArgs)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  if (!options) return null;

  return (
    <div className="c-misc-checkbox-ctr">
      {options.map((option: string) => {
        const onChange = () => {
          const updatedValue = value?.includes(option)
            ? value.filter((element) => element !== option)
            : [...value, option];

          updateItem({ ...queryArgs, value: updatedValue });
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
