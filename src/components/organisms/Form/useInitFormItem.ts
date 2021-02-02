import { useEffect } from 'react';

import { getFormItemKey } from '@organisms/Form/Form.util';
import StoryStore from '@organisms/Story/Story.store';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';

const useInitFormItem = ({
  category,
  id,
  required,
  title,
  type,
  validate,
  value
}: FormItemData) => {
  const key = getFormItemKey({ category, id, title });

  const storedValue = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setItem = FormStore.useStoreActions((store) => store.setItem);
  const storyStore = StoryStore.useStore();
  const storyItems = storyStore?.getState()?.items;
  const setValue = storyStore?.getActions()?.setValue;

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

  useEffect(() => {
    // const
    if (storyItems && storyItems[key]?.value !== storedValue) {
      setValue({ key, value: storedValue });
    }
  }, [storedValue]);
};

export default useInitFormItem;
