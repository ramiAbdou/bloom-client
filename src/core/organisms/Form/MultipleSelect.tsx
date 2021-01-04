import React from 'react';

import Checkbox from '@atoms/Checkbox';
import Form from './Form.store';
import { FormItemData } from './Form.types';

export default ({ options, title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  if (!options) return null;

  return (
    <div className="c-misc-checkbox-ctr">
      {options.map((option: string) => {
        const onChange = () => {
          const updatedValue = value?.includes(option)
            ? value.filter((element) => element !== option)
            : [...value, option];

          updateItem({ title, value: updatedValue });
        };

        return (
          <Checkbox
            checked={value?.includes(option)}
            title={option}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};
