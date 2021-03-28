import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import Show from '@containers/Show';
import FormStore from './Form.store';
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
  const key = getFormItemKey(args);

  const value: string[] = FormStore.useStoreState(({ items }) => {
    return items[key]?.value as string[];
  });

  const setValue = FormStore.useStoreActions((store) => {
    return store.setValue;
  });

  useInitFormItem(args);

  return (
    <Show show={show}>
      <FormItemContainer {...args}>
        <div className="c-misc-checkbox-ctr">
          {args?.options.map((option: string) => {
            const onChange = () => {
              const updatedValue = value?.includes(option)
                ? value.filter((element) => {
                    return element !== option;
                  })
                : [...value, option];

              setValue({ key, value: updatedValue });
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
