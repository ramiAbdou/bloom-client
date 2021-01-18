import deepequal from 'fast-deep-equal';
import React, { useCallback, useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ButtonProps } from '@atoms/Button/Button';
import { FormItemData, OnFormSubmit } from '@organisms/Form/Form.types';
import { validateItems } from '@organisms/Form/Form.util';
import FormStore from './Form.store';

interface FormContinueButtonProps extends ButtonProps {
  onContinue?: OnFormSubmit;
}

const FormContinueButton: React.FC<FormContinueButtonProps> = ({
  children,
  disabled,
  onContinue,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const items = FormStore.useStoreState((store) => store.items, deepequal);
  const goToNextPage = FormStore.useStoreActions((store) => store.goToNextPage);
  const setError = FormStore.useStoreActions((store) => store.setErrorMessage);

  const setItemErrorMessages = FormStore.useStoreActions(
    (store) => store.setItemErrorMessages
  );

  const onButtonContinue = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!onContinue) return;

      const validatedItems: FormItemData[] = validateItems(items).filter(
        ({ initialValue, value }: FormItemData) =>
          !deepequal(initialValue, value)
      );

      if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
        setItemErrorMessages(validatedItems);
        return;
      }

      setError(null);
      setLoading(true);

      await onContinue({
        goToNextPage: null,
        items: validatedItems,
        setErrorMessage: setError
      });

      setLoading(false);
      goToNextPage();
    },
    [items]
  );

  const isPageCompleted = FormStore.useStoreState(
    (store) => store.isPageCompleted
  );

  return (
    <Button
      fill
      large
      primary
      className="o-form-submit--continue"
      disabled={disabled || !isPageCompleted}
      loading={loading}
      // @ts-ignore b/c we don't care if it is async.
      onClick={onButtonContinue}
      {...props}
    >
      {children}
      <IoChevronForwardOutline />
    </Button>
  );
};

export default FormContinueButton;
