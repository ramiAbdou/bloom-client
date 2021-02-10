import { useEffect } from 'react';

import { getFormItemKey } from '@organisms/Form/Form.util';
import StoryStore from '@organisms/Story/Story.store';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';

const useInitFormItem = (props: FormItemData) => {
  const key = getFormItemKey(props);

  const storedValue = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setItem = FormStore.useStoreActions((store) => store.setItem);
  const storyStore = StoryStore.useStore();
  const storyItems = storyStore?.getState()?.items;
  const setStoryItem = storyStore?.getActions()?.setItem;
  const setStoryValue = storyStore?.getActions()?.setValue;

  const { required, type, value } = props;

  useEffect(() => {
    const emptyValue =
      (type === 'MULTIPLE_SELECT' && []) || (type === 'TOGGLE' && false) || '';

    setItem({
      ...props,
      required: required ?? true,
      value: value ?? emptyValue
    });

    if (storyStore?.getState()?.items) setStoryItem(props);
  }, []);

  useEffect(() => {
    if (storyItems && storyItems[key]?.value !== storedValue) {
      setStoryValue({ key, value: storedValue });
    }
  }, [storedValue]);
};

export default useInitFormItem;
