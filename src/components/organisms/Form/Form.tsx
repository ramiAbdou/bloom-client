import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import Show from '@containers/Show';
import StoryStore from '@organisms/Story/Story.store';
import { useStore } from '@store/Store';
import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, FormProps } from './Form.types';
import { getFormItemKey, validateItem } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  spacing
}) => {
  const globalStore = useStore();

  const items: Record<string, FormItemData> = FormStore.useStoreState(
    (store) => store.items,
    deepequal
  );

  const setError = FormStore.useStoreActions((store) => store.setError);
  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);
  const storyStore = StoryStore.useStore();

  const setItemErrors = FormStore.useStoreActions(
    (store) => store.setItemErrors
  );

  const onFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!onSubmit) return;

      const validatedItems: Record<string, FormItemData> = Object.values(
        items
      )?.reduce((acc: Record<string, FormItemData>, item: FormItemData) => {
        const key = getFormItemKey(item);
        return { ...acc, [key]: validateItem(item) };
      }, {});

      if (Object.values(validatedItems).some(({ error }) => !!error)) {
        setItemErrors(validatedItems);
        return;
      }

      setError(null);
      setIsLoading(true);

      await onSubmit({
        actions: globalStore.getActions(),
        db: globalStore.getState()?.db,
        goForward: storyStore?.getActions()?.goForward,
        items: validatedItems,
        setError,
        setItems: storyStore?.getActions()?.setItems,
        storyItems: storyStore?.getState()?.items
      });

      setIsLoading(false);
    },
    [items, ...(onSubmitDeps || [])]
  );

  const css = cx('o-form', {
    [className]: className,
    'o-form--spacing-lg': !spacing || spacing === 'lg',
    'o-form--spacing-md': !spacing || spacing === 'md'
  });

  return (
    <form className={css} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

const Form: React.FC<FormProps> = ({ options, show, ...props }: FormProps) => (
  <Show show={show}>
    <FormStore.Provider runtimeModel={{ ...formModel, options }}>
      <FormContent {...props} />
    </FormStore.Provider>
  </Show>
);

export default Form;
