/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import { useManualQuery } from 'graphql-hooks';
import React from 'react';

import { PrimaryButton } from '@components/Button';
import { PrimaryButtonProps } from '@components/Button/PrimaryButton';
import { Form } from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { DOES_USER_EXIST } from '../Login.gql';

const SubmitButton = (props: Partial<PrimaryButtonProps>) => (
  <PrimaryButton
    className="s-login-submit-btn"
    loadingText="Submitting..."
    title="Send Me a Login Link"
    {...props}
  />
);

const Content = () => {
  const { value } = Form.useStoreState((store) => store.getItem('Email'));

  const [doesUserExist, { data, loading }] = useManualQuery(DOES_USER_EXIST, {
    variables: { email: value }
  });

  const message =
    data && !data.doesUserExist && 'You must be a member of a community.';

  return (
    <>
      <FormContent />
      <SubmitButton
        disabled={!value}
        isLoading={loading}
        onClick={doesUserExist}
      />
      {!!message && <ErrorMessage message={message} />}
    </>
  );
};

export default () => (
  <Form.Provider
    initialData={{
      itemCSS: 's-login-form-item',
      questions: [
        {
          description:
            'Or continue with your email address to receive a login link.',
          placeholder: 'Email',
          title: 'Email',
          type: 'SHORT_TEXT'
        }
      ]
    }}
  >
    <Content />
  </Form.Provider>
);
