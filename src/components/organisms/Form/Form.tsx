import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import Show from '@containers/Show';
import StoryStore from '@organisms/Story/Story.store';
import { useStore } from '@store/Store';
import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, FormProps } from './Form.types';
import { validateItem } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  spacing
}) => {
  const globalStore = useStore();
  const items = FormStore.useStoreState((store) => store.items, deepequal);
  const setError = FormStore.useStoreActions((store) => store.setErrorMessage);
  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);
  const storyStore = StoryStore.useStore();

  const setItemErrorMessages = FormStore.useStoreActions(
    (store) => store.setItemErrorMessages
  );

  const onFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!onSubmit) return;

      const validatedItems: FormItemData[] = items?.map(validateItem);

      if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
        setItemErrorMessages(validatedItems);
        return;
      }

      setError(null);
      setIsLoading(true);

      const goForwardFn = () => {
        const goForward = storyStore?.getActions()?.goForward;
        if (goForward) goForward();
      };

      await onSubmit({
        actions: globalStore.getActions(),
        db: globalStore.getState()?.db,
        goForward: goForwardFn,
        items: validatedItems,
        setErrorMessage: setError,
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
