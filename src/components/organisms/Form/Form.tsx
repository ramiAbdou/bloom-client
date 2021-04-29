import React, { useCallback } from 'react';

import StoryStore from '@components/organisms/Story/Story.store';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import { cx } from '@util/util';
import { FormProvider, useForm } from './Form.state';
import { FormItemData, FormProps } from './Form.types';
import { getError, getFormItemKey } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  spacing
}) => {
  const [{ items }, formDispatch] = useForm();
  const gql: GQL = useGQL();

  const storyStore = StoryStore.useStore();

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
        formDispatch({ items: validatedItems, type: 'SET_ITEMS' });
        return;
      }

      formDispatch({ error: null, type: 'SET_ERROR' });
      formDispatch({ loading: true, type: 'SET_LOADING' });

      const { goForward, setValue: setStoryValue } =
        storyStore?.getActions() ?? {};

      try {
        await onSubmit({
          formDispatch,
          goForward,
          gql,
          items: validatedItems,
          setStoryValue,
          storyItems: storyStore?.getState()?.items
        });

        formDispatch({ loading: false, type: 'SET_LOADING' });
      } catch (e) {
        formDispatch({ error: e, type: 'SET_ERROR' });
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

const Form: React.FC<FormProps> = ({ options, ...props }: FormProps) => (
  <FormProvider options={options}>
    <FormContent {...props} />
  </FormProvider>
);

export default Form;
