import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import Show from '@components/containers/Show';
import StoryStore from '@components/organisms/Story/Story.store';
import { useStore } from '@core/store/Store';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, FormProps } from './Form.types';
import { getError, getFormItemKey } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  spacing
}) => {
  const gql: GQL = useGQL();
  const globalStore = useStore();

  const items: Record<string, FormItemData> = FormStore.useStoreState(
    (state) => state.items,
    deepequal
  );

  const setError = FormStore.useStoreActions((state) => state.setError);
  const setIsLoading = FormStore.useStoreActions((state) => state.setIsLoading);
  const storyStore = StoryStore.useStore();

  const setItemErrors = FormStore.useStoreActions(
    (state) => state.setItemErrors
  );

  const onFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!onSubmit) return;

      const validatedItems: Record<string, FormItemData> = Object.values(
        items
      )?.reduce((acc: Record<string, FormItemData>, item: FormItemData) => {
        const key = getFormItemKey(item);
        return { ...acc, [key]: { ...item, error: getError(item) } };
      }, {});

      if (Object.values(validatedItems).some(({ error }) => !!error)) {
        setItemErrors(validatedItems);
        return;
      }

      setError(null);
      setIsLoading(true);

      const { modal, panel, toast } = globalStore?.getActions() ?? {};

      const { goForward, setValue: setStoryValue } =
        storyStore?.getActions() ?? {};

      try {
        await onSubmit({
          closeModal: modal?.closeModal,
          closePanel: panel?.closePanel,
          db: globalStore.getState()?.db,
          goForward,
          gql,
          items: validatedItems,
          setError,
          setStoryValue,
          showToast: toast?.showToast,
          storyItems: storyStore?.getState()?.items
        });

        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    },
    [items, ...(onSubmitDeps || [])]
  );

  const css: string = cx(
    'o-form',
    {
      'o-form--spacing-lg': spacing === 'lg',
      'o-form--spacing-md': !spacing || spacing === 'md'
    },
    className
  );

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
