import React, { useCallback } from 'react';

import { useStorySafe } from '@components/organisms/Story/Story.state';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import { ClassNameProps, ShowProps } from '@util/constants';
import { cx } from '@util/util';
import { StoryAction, StoryState } from '../Story/Story.types';
import { FormProvider, useForm } from './Form.state';
import { FormAction, FormItemData, FormOptions } from './Form.types';
import { getError, getFormItemKey } from './Form.util';

export interface FormProps extends ClassNameProps, ShowProps {
  questions?: FormItemData[];
  options?: FormOptions;
  onSubmit?: OnFormSubmitFunction;
  onSubmitDeps?: any[];
  spacing?: 'md' | 'lg';
}

export interface OnFormSubmitArgs {
  formDispatch: React.Dispatch<FormAction>;
  storyDispatch?: React.Dispatch<StoryAction>;
  gql: GQL;
  items: Record<string, FormItemData>;
  storyState?: StoryState;
}

export type OnFormSubmitFunction = (args: OnFormSubmitArgs) => Promise<void>;

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  spacing
}) => {
  const [{ items }, formDispatch] = useForm();
  const [, storyDispatch] = useStorySafe();
  const gql: GQL = useGQL();

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

      try {
        await onSubmit({
          formDispatch,
          gql,
          items: validatedItems,
          storyDispatch
        });

        formDispatch({ loading: false, type: 'SET_LOADING' });
      } catch (e) {
        formDispatch({ error: e.message, type: 'SET_ERROR' });
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
