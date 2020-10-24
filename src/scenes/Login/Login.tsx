/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import Cookies from 'js-cookie';
import React from 'react';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form/Form.store';
import FormItem from '@components/Form/FormItem';
import Logo from '@components/Logo/Logo';
import Separator from '@components/Misc/Separator';
import GoogleButton from './components/GoogleButton';

const SubmitButton = () => (
  <PrimaryButton className="s-login-submit-btn" title="Send Me a Login Link" />
);

const Content = () => (
  <>
    {Form.useStoreState((store) => store.items)?.map((props) => (
      <FormItem key={props.title} {...props} />
    ))}
  </>
);

const LoginCard = () => {
  const googleErrorMessage =
    Cookies.get('LOGIN_ERROR') === 'user_not_found'
      ? 'You must be accepted into a community before attempting to login.'
      : '';

  const onEmailSubmit = () => {};

  return (
    <div className="s-login-card">
      <GoogleButton />
      {!!googleErrorMessage && <p>{googleErrorMessage}</p>}
      <Separator />
      <Form.Provider
        initialData={{
          itemCSS: 's-login-form-item',
          questions: [
            {
              description:
                'Or continue with your email address to receive a temporary login link.',
              placeholder: 'Email',
              title: 'Email',
              type: 'SHORT_TEXT'
            }
          ],
          submitForm: onEmailSubmit
        }}
      >
        <Content />
        <SubmitButton />
      </Form.Provider>
    </div>
  );
};

export default () => (
  <div className="s-login">
    <Logo large className="s-login-logo" />
    <h3 className="s-login-title">Log In to Bloom</h3>
    <LoginCard />
  </div>
);
