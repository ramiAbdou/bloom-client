import { useEffect } from 'react';

import { getFormItemKey } from '@components/organisms/Form/Form.util';
import StoryStore from '@components/organisms/Story/Story.store';
import { QuestionType } from '@util/constants';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';

const useInitFormItem = (props: FormItemData): void => {
  const [, tableDispatch] = useForm();

  const key: string = getFormItemKey(props);
  const storedValue: unknown = useFormItem(key)?.value;

  const storyStore = StoryStore.useStore();
  const storyItems = storyStore?.getState()?.items;
  const setStoryItem = storyStore?.getActions()?.setItem;
  const setStoryValue = storyStore?.getActions()?.setValue;
  const { required, type, value } = props;

  useEffect(() => {
    const emptyValue =
      (type === QuestionType.MULTIPLE_SELECT && []) ||
      (type === QuestionType.TOGGLE && false) ||
      '';

    tableDispatch({
      item: {
        ...props,
        required: required ?? true,
        value: value ?? emptyValue
      },
      type: 'SET_ITEM'
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
